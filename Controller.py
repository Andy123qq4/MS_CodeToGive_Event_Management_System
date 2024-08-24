from flask import Flask, jsonify, request
from datetime import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

"""

By Andy: This file contains all API endpoints for the application.


"""

# Connect to MongoDB
client = MongoClient(
    "mongodb+srv://mscodetogive:team12isthewinner@cluster0.xnb7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client["MSCodeToGive"]
events = db["event"]
registrations = db["registrations"]


# ==================Event operations=======================


# Event CRUD operations
@app.route("/events/create", methods=["POST"])
def create_event():
    data = request.get_json()
    event_name = data.get("name")
    event_date = data.get("date")
    event_location = data.get("location")
    event_description = data.get("description")

    # Create a new event
    event = {
        # "event_id": auto increment,
        "name": event_name,
        "date": event_date,
        "location": event_location,
        "description": event_description,
    }
    result = events.insert_one(event)
    new_event = events.find_one({"_id": result.inserted_id})
    new_event["_id"] = str(new_event["_id"])
    return jsonify(new_event), 201


# ==================Registration operations=======================


# Registration operations
@app.route("/events/<event_id>/register", methods=["POST"])
def register_for_event(event_id):
    data = request.get_json()
    attendee_name = data.get("name")
    attendee_email = data.get("email")

    # Check if the event exists
    event = events.find_one({"_id": ObjectId(event_id)})
    if not event:
        return jsonify({"error": "Event not found"}), 404

    # Check if the attendee is already registered
    existing_registration = registrations.find_one(
        {"event_id": ObjectId(event_id), "name": attendee_name, "email": attendee_email}
    )
    if existing_registration:
        return jsonify({"error": "Attendee is already registered for this event"}), 400

    # Create a new registration
    registration = {
        "event_id": ObjectId(event_id),
        "name": attendee_name,
        "email": attendee_email,
        "created_at": datetime.now(),
    }
    result = registrations.insert_one(registration)
    new_registration = registrations.find_one({"_id": result.inserted_id})
    new_registration["_id"] = str(new_registration["_id"])
    return jsonify(new_registration), 201


@app.route("/events/<event_id>/unregister", methods=["POST"])
def unregister_from_event(event_id):
    data = request.get_json()
    attendee_name = data.get("name")
    attendee_email = data.get("email")

    # Check if the event exists
    event = events.find_one({"_id": ObjectId(event_id)})
    if not event:
        return jsonify({"error": "Event not found"}), 404

    # Check if the attendee is registered
    registration = registrations.find_one(
        {"event_id": ObjectId(event_id), "name": attendee_name, "email": attendee_email}
    )
    if not registration:
        return jsonify({"error": "Attendee is not registered for this event"}), 404

    # Remove the registration
    result = registrations.delete_one({"_id": registration["_id"]})
    if result.deleted_count == 1:
        return jsonify({"message": "Attendee unregistered successfully"}), 200
    else:
        return jsonify({"error": "Failed to unregister the attendee"}), 500


if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)
