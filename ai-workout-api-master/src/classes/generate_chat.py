# Use the Conversation API to send a text message to Amazon Titan Text.

import boto3
from botocore.exceptions import ClientError

from src.config import configs

# Create a Bedrock Runtime client in the AWS Region you want to use.

class ConverseModel:
    def _get_new_session(self):
        return boto3.Session(
        aws_access_key_id=configs.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=configs.AWS_SECRET_ACCESS_KEY,
        aws_session_token=configs.AWS_SESSION_TOKEN,  # Optional, only for temporary credentials
        region_name=configs.AWS_DEFAULT_REGION
    )

    def generate_converse(self, input_text):
        session = self._get_new_session()
        client = session.client(service_name='bedrock-runtime')
 
        # Set the model ID, e.g., Titan Text Premier.
        model_id = "anthropic.claude-3-sonnet-20240229-v1:0"

        # Define the task context and instructions for the bot
        task_instructions = """
            You are a Workout Specialist and you are going to organize a training plan into 3 different days, based on the a list of exercises I am sending.
            Organize the following exercises into a JSON structure containing the workout plan.
            You have a min of 3 exercises and a max of 5 exercises per day.
            Don't mix exercises with chest and back, or leg and chest or back and leg.
            I just want you to return something like this in JSON format without any other content.
            [
                {
                    "day": 1,
                    exercises: [
                        {
                            "name": "Exercise 1",
                            "sets": 3,
                            "reps": 12,
                            "muscle_group": ['Triceps', 'Chest'],
                            "difficulty": "Intermediate",
                        },
                        {
                            "name": "Exercise 2",
                            "sets": 3,
                            "reps": 12,
                            "muscle_group": ['Bicep', 'Back'],
                            "difficulty": "Intermediate",
                        }

                    ]
                },
                {
                    "day": 2,
                    exercises: [
                        {
                            "name": "Exercise 3",
                            "sets": 3,
                            "reps": 12,
                            "muscle_group": ['Legs'],
                            "difficulty": "Intermediate",
                        },
                        {
                            "name": "Exercise 4",
                            "sets": 3,
                            "reps": 12,
                            "muscle_group": ['Quadriceps'],
                            "difficulty": "Advanced",
                        },
                    }
                },
                {
                    "day": 3,
                    exercises: [
                        {
                            "name": "Exercise 5",
                            "sets": 3,
                            "reps": 12,
                            "muscle_group": ['Shoulder'],
                            "difficulty": "Advanced",
                        },
                        {
                            "name": "Exercise 6",
                            "sets": 3,
                            "reps": 12,
                            "muscle_group": ['Leg'],
                            "difficulty": "Beginner",
                        },
                    }
                }
            ]
        """

        conversation = [
            {
                "role": "user",
               "content": [{"text": f"{task_instructions}\n Please consider the following exercises for the workout plan: {input_text}"}],
            }
        ]

        try:
            # Send the message to the model, using a basic inference configuration.
            response = client.converse(
                modelId=model_id,
                messages=conversation,
                inferenceConfig={"maxTokens": 2048, "temperature": 0.1, "topP": 0.9},
            )

            # Extract and print the response text.
            response_text = response["output"]["message"]["content"][0]["text"]
            print("aaaaugh")
            print(response_text)

            return response

        except (ClientError, Exception) as e:
            print(f"ERROR: Can't invoke '{model_id}'. Reason: {e}")
            exit(1)


