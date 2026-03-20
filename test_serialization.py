from backend.models import HomeContent
from bson import ObjectId
import json

def test_serialization():
    # Simulate a document from MongoDB
    doc = {
        "_id": ObjectId(),
        "type": "home",
        "title": "Test Title",
        "subtitle": "Test Subtitle"
    }
    
    try:
        # Create model instance
        home = HomeContent(**doc)
        print("Model instance created successfully")
        
        # Test dict conversion
        data = home.model_dump(by_alias=True)
        print(f"model_dump(by_alias=True): {data}")
        
        # Test JSON serialization (simulating FastAPI response)
        json_data = home.model_dump_json(by_alias=True)
        print(f"model_dump_json(by_alias=True): {json_data}")
        
        if "_id" in data and isinstance(data["_id"], str):
            print("SUCCESS: _id serialized to string")
        else:
            print(f"FAILURE: _id is {type(data.get('_id'))}")
            
    except Exception as e:
        print(f"Serialization error: {e}")

if __name__ == "__main__":
    test_serialization()
