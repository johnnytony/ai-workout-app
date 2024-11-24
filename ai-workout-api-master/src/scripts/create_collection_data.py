import os

import pandas as pd
from qdrant_client.models import VectorParams, Distance, FieldCondition, Filter, MatchValue, PointStruct, MatchAny


df = pd.read_csv('embedded_exercises.csv')

df = df.where(pd.notnull(df), None)


from qdrant_client import QdrantClient
import numpy as np


client = QdrantClient(host="qdrant", port=6333)


client.recreate_collection(
    collection_name="exercise_data",
vectors_config =  VectorParams(
        size=256,  # Vector dimensionality
        distance="Cosine"  # Distance metric (Cosine, Euclidean, Dot)
    )
)

points = []

import ast



for index, row in df.iterrows():
    point = {
        "id": index,  # Unique ID for each exercise
        "vector": ast.literal_eval(row["Embedding"]),  # The embedding of the exercise
        "payload": {
            "name": row["Name of Exercise"],
            "benefit": row["Benefit"],
            "sets": row["Sets"],
            "reps": row["Reps"],
            "burns_calories": row["Burns Calories"],
            "target_muscle_group": row["Target Muscle Group"].split(', '),
            "equipment_needed": row["Equipment Needed"],
            "difficulty_level": row["Difficulty Level"],
        }
    }
    points.append(point)
    
client.upsert(
    collection_name="exercise_data",
    points=[
        PointStruct(
            id=point['id'], 
            vector=point["vector"], 
            payload=point["payload"]
        ) for point in points
    ]
)