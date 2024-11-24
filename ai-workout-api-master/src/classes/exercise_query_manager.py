from qdrant_client import QdrantClient


class ExerciseQueryManager:
    client = QdrantClient(host="qdrant", port=6333)

    def query(self, query_vector, query_filter):
        return self.client.search(
            collection_name="exercise_data",
            query_vector=query_vector,
            query_filter=query_filter,
            limit=20
        )

