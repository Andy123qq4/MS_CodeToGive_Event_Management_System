from flask import Flask, jsonify, request, make_response
from datetime import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId
import logging

app = Flask(__name__)
log = logging.getLogger(__name__)


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


# Create a new event
@app.route("/events/create", methods=["POST"])
def create_event():
    data = request.get_json()

    # Create a new event
    event = {
        # "id": data.get("id"),
        "created_by": data.get("created_by"),
        "event_details": data.get("event_details"),
        "isDeleted": data.get("isDeleted"),
        "isPublished": data.get("isPublished"),
        "participants": data.get("participants"),
        "reminder": data.get("reminder"),
        "training": data.get("training"),
    }
    print(event)

    duplicate_event = events.find_one(
        {
            "created_by": event["created_by"],
            "event_details.event_name": event["event_details"]["event_name"],
            "event_details.start_date": event["event_details"]["start_date"],
            "event_details.start_time": event["event_details"]["start_time"],
            "event_details.end_date": event["event_details"]["end_date"],
            "event_details.end_time": event["event_details"]["end_time"],
        }
    )
    print(duplicate_event)
    if duplicate_event:
        duplicate_event["_id"] = str(duplicate_event["_id"])
        response_data = {
            "code": 400,
            "description": "Event already exists",
            "data": duplicate_event,
        }
        return make_response(jsonify(response_data), 400)

    try:
        result = events.insert_one(event)
        new_event = events.find_one({"_id": result.inserted_id})
        new_event["_id"] = str(new_event["_ id"])
        return make_response(jsonify(new_event), 201)
    except Exception as e:
        log.error(f"Error creating event: {e}")
        return make_response(jsonify({"error": str(e)}), 400)


# Get all events
@app.route("/events/get-all", methods=["GET"])
def get_all_events():
    try:
        all_events = list(events.find())
        for event in all_events:
            event["_id"] = str(event["_id"])
        return jsonify(all_events), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Get a specific event
@app.route("/events/get-specific/<event_id>", methods=["GET"])
def get_event(event_id):
    try:
        event = events.find_one({"_id": ObjectId(event_id)})
        if event:
            event["_id"] = str(event["_id"])
            return jsonify(event), 200
        else:
            return jsonify({"error": "Event not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Update an event
@app.route("/events/update/<event_id>", methods=["PUT"])
def update_event(event_id):
    data = request.get_json()
    updated_event = {
        "created_by": data.get("created_by"),
        "event_details": data.get("event_details"),
        "isDeleted": data.get("isDeleted"),
        "isPublished": data.get("isPublished"),
        "participants": data.get("participants"),
        "reminder": data.get("reminder"),
        "training": data.get("training"),
    }
    try:
        result = events.update_one({"_id": ObjectId(event_id)}, {"$set": updated_event})
        if result.modified_count == 1:
            updated_event["_id"] = event_id
            return jsonify(updated_event), 200
        else:
            return jsonify({"error": "Failed to update the event"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Delete an event
@app.route("/events/delete/<event_id>", methods=["DELETE"])
def delete_event(event_id):
    try:
        result = events.delete_one({"_id": ObjectId(event_id)})
        if result.deleted_count == 1:
            return jsonify({"message": "Event deleted successfully"}), 200
        else:
            return jsonify({"error": "Failed to delete the event"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


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

# # Create a new event
# @app.route("/events/create", methods=["POST"])
# def create_event():
#     # get the data from the request
#     data = request.get_json()
#     create_state = data.get("createState")
#     is_published = data.get("isPublished")
#     is_deleted = data.get("isDeleted")
#     created_by = data.get("created_by")
#     last_modified_by = data.get("last_modified_by")
#     event_details = data.get("event_details")
#     training = data.get("training")
#     reminder = data.get("reminder")
#     participants = data.get("participants")

#     # check if the event already exists
#     event = events.find_one({"event_name": event_details.get("event_name")})
#     if event:
#         return jsonify({"error": "Event already exists"}), 400

#     # create a new event
    
#     event = {
#         "event_id": ObjectId(event_id),
#         "name": attendee_name,
#         "email": attendee_email,
#         "created_at": datetime.now(),
#     }
#     result = registrations.insert_one(registration)
#     new_registration = registrations.find_one({"_id": result.inserted_id})
#     new_registration["_id"] = str(new_registration["_id"])
#     return jsonify(new_registration), 201





# # Delete an event
# @app.route("/events/update/<event_id>", methods=["POST"])
# def update_event(event_id):

# # Update an event
# @app.route("/events/delete/<event_id>", methods=["POST"])
# def delete_event(event_id):


# Retrieve all events

# helper functions

# ==================Event operations=======================

if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)
