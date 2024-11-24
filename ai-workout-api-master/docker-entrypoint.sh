#!/bin/bash
# Migrate data into vector database
python3 src/scripts/create_collection_data.py

uvicorn src.main:app --host 0.0.0.0 --port 8080