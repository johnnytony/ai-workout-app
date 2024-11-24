import json
import boto3

from src.config import configs


class EmbeddingModel:
    def _get_new_session(self):
        return boto3.Session(
        aws_access_key_id=configs.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=configs.AWS_SECRET_ACCESS_KEY,
        aws_session_token=configs.AWS_SESSION_TOKEN,  # Optional, only for temporary credentials
        region_name=configs.AWS_DEFAULT_REGION
    )

    def generate_embedding(self, input_text):
        session = self._get_new_session()
        bedrock = session.client(service_name='bedrock-runtime')

        accept = "application/json"
        content_type = "application/json"

        body = json.dumps({
            "inputText": input_text,
            "embeddingConfig": {
                "outputEmbeddingLength": 256
            }
        })

        response = bedrock.invoke_model(
            body=body, 
            modelId="amazon.titan-embed-image-v1", 
            accept=accept, 
            contentType=content_type
        )

        response_body = json.loads(response.get('body').read())
        embedding = response_body.get('embedding')

        return embedding
