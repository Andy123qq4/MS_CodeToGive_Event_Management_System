from pymongo import MongoClient

# Replace with your actual connection string
client = MongoClient(
    "mongodb+srv://mscodetogive:team12isthewinner@cluster0.xnb7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)

db = client["MSCodeToGive"]

event = db["event"]


event.insert_one({"event_name": "Let's have a lunch", "age": 30, "city": "New York"})
