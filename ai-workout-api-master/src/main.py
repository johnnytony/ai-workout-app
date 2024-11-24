import json
from typing import Union

from fastapi import FastAPI, HTTPException
from pydantic import ValidationError

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from src.config import configs
from src.schemas.user_preferences import UserPreferences

from src.classes.generate_embedding import EmbeddingModel
from src.classes.generate_chat import ConverseModel
from src.classes.exercise_query_manager import ExerciseQueryManager

from qdrant_client.models import VectorParams, Distance, FieldCondition, Filter, MatchValue, PointStruct, MatchAny


@app.post("/generate/workout")
def generate_workout(muscle_group: str, fitness_level: str):

    try:
        # Simulate validation check (although Pydantic automatically handles this)
        user_preferences = UserPreferences(
            muscle_group=muscle_group, 
            fitness_level=fitness_level
        )
    except ValidationError as e:
        raise HTTPException(status_code=400, detail=[error for error in e.errors()])
    
    print(f"'difficulty_level': '{user_preferences.fitness_level}'")
    
    embeddings = EmbeddingModel().generate_embedding(f'"difficulty_level": {user_preferences.fitness_level}')

    exercise_query_manager = ExerciseQueryManager()

    muscle_options = {
        'upper_body': configs.upper_body,
        'lower_body': configs.lower_body,
        'full_body': configs.full_body
    }

    muscle_group = list(muscle_options.get(user_preferences.muscle_group))

    query_vector = embeddings
    query_filter = Filter(
        must=[
            FieldCondition(
                key="difficulty_level",
                match=MatchValue(value=user_preferences.fitness_level)
            ),
            FieldCondition(
                key="target_muscle_group",
                match=MatchAny(any=muscle_group)
            )
        ],
    )
    exercises_data = exercise_query_manager.query(query_vector, query_filter)

    exercises_data = [exercise.payload for exercise in exercises_data]

    response = ConverseModel().generate_converse(exercises_data)

    response = response["output"]["message"]["content"][0]["text"].replace("```json", '')
    response = response.replace("```", '')

    print(response)


    return json.loads(response)  
