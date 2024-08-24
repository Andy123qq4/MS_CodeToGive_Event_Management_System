from pymongo import MongoClient

# Replace with your actual connection string
# Ask Andy or Justin to get your IP whitelisted
client = MongoClient(
    "mongodb+srv://mscodetogive:team12isthewinner@cluster0.xnb7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)

# Insert a new document into the "event" collection in the "MSCodeToGive" database
db = client["MSCodeToGive"]
# choose the event collection (or you may say table in SQL)
event = db["event"]
event.insert_one(
    {
        "event_name": "Let's have a dinner",
        "age": 3220,
        "city": "New !!",
        "date": "2024-05-30",
    }
)
