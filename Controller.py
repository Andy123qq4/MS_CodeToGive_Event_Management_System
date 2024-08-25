from flask import Flask, jsonify, request, make_response
from werkzeug.security import generate_password_hash, check_password_hash
import os
from flask_cors import CORS
from datetime import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId
import logging

# import openai  # pip install openai==0.28 (old version)

app = Flask(__name__)
log = logging.getLogger(__name__)
# connect to local frontend
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})

"""
This file contains all API endpoints for the application.
"""

# Connect to MongoDB
client = MongoClient(
    "mongodb+srv://mscodetogive:team12isthewinner@cluster0.xnb7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client["MSCodeToGive"]

events = db["event"]
users = db["users"]
accounts = db["accounts"]
badges = db["badges"]
trainings = db["trainings"]
registrations = db["registrations"]


# ==================Event operations=======================


# Create a new event
@app.route("/api/events/create", methods=["POST"])
def create_event():
    data = request.get_json()

    # Create a new event
    event = {
        "createState": "Finished",
        "isPublished": data.get("isPublished", False),
        "isDeleted": False,
        "created_by": data.get("created_by", "a1"),
        "event_details": {
            "event_name": data.get("event_details", {}).get("event_name"),
            "image_url": data.get("event_details", {}).get("image_url"),
            "start_date": data.get("event_details", {}).get("start_date"),
            "start_time": data.get("event_details", {}).get("start_time"),
            "end_date": data.get("event_details", {}).get("end_date"),
            "end_time": data.get("event_details", {}).get("end_time"),
            "location": data.get("event_details", {}).get("location"),
            "description": data.get("event_details", {}).get("description"),
            "quota": data.get("event_details", {}).get("quota"),
            "target_audience": data.get("event_details", {}).get("target_audience", []),
            "event_tags": data.get("event_details", {}).get("event_tags", []),
        },
        "training": {
            "sections": [
                {
                    "section_heading": section.get("section_heading"),
                    "video_link": section.get("video_link"),
                    "section_description": section.get("section_description"),
                }
                for section in data.get("training", {}).get("sections", [])
            ],
        },
        "reminder": {
            "default_message": data.get("reminder", {}).get("default_message"),
            "additional_message": data.get("reminder", {}).get("additional_message"),
        },
        "participants": {
            "clients": data.get("participants", {}).get("clients", []),
            "volunteers": data.get("participants", {}).get("volunteers", []),
            "admins": data.get("participants", {}).get("admins", []),
        },
        "created_time": datetime.now(),
    }

    duplicate_event = events.find_one(
        {
            "created_by": event["created_by"],
            "event_details.event_name": event["event_details"]["event_name"],
        }
    )
    print(duplicate_event)
    if duplicate_event:
        duplicate_event["_id"] = str(duplicate_event["_id"])
        response_data = {
            "code": 400,
            "description": "Event already exists",
            "data": duplicate_event["_id"],
        }
        return make_response(jsonify(response_data), 400)

    try:
        result = events.insert_one(event)
        new_event = events.find_one({"_id": result.inserted_id})
        log.info(f"Event created: {new_event}")
        new_event["_id"] = str(new_event["_id"])
        response_data = {
            "code": 201,
            "description": "Event created successfully",
            "data": new_event["_id"],
        }
        return make_response(jsonify(response_data), 201)
    except Exception as e:
        log.error(f"Error creating event: {e}")
        response_data = {
            "code": 500,
            "error": str(e),
        }
        return make_response(jsonify(response_data), 500)


# Get all events
@app.route("/api/events/get-all", methods=["GET"])
def get_all_events():
    try:
        all_events = list(events.find())
        for event in all_events:
            event["_id"] = str(event["_id"])
        return jsonify(all_events), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Get a specific event
@app.route("/api/events/get-specific/<event_id>", methods=["GET"])
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
@app.route("/api/events/update/<event_id>", methods=["POST"])
def update_event(event_id):
    data = request.get_json()
    updated_event = {
        "createState": data.get("createState"),
        "created_by": data.get("created_by"),
        "event_details": data.get("event_details"),
        "isDeleted": data.get("isDeleted"),
        "isPublished": data.get("isPublished"),
        "participants": data.get("participants"),
        "reminder": data.get("reminder"),
        "training": data.get("training"),
    }
    try:
        event = events.find_one({"_id": ObjectId(event_id)})
    except Exception as e:
        return jsonify({"error": "failed to find the event"}), 500

    if (event["event_details"]["event_name"]) != (
        updated_event["event_details"]["event_name"]
    ):
        return jsonify({"error": "cannot change the event name"}), 500
    if (event["created_by"]) != (updated_event["created_by"]):
        return jsonify({"error": "cannot change who created the event"}), 500

    try:
        result = events.update_one({"_id": ObjectId(event_id)}, {"$set": updated_event})
        if result.modified_count == 1:
            updated_event["_id"] = str(event["_id"])
            return jsonify({"Event Updated Successfully": updated_event}), 200
        else:
            return jsonify({"Error": "No changes made to the event"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Delete an event
@app.route("/api/events/delete/<event_id>", methods=["DELETE"])
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
@app.route("/api/events/register", methods=["POST"])
def register_for_event():
    data = request.get_json()

    try:
        event_id = data.get("event_id")
        participant_data = {
            "user_id": data.get("user_id"),
            "registered_at": datetime.now(),
        }
    except Exception as e:
        response = make_response(
            jsonify(
                {
                    "code": 500,
                    "description": "Internal Server Error",
                    "data": {"error": str(e)},
                }
            ),
            500,
        )
        return response

    # Check if the event exists
    event = events.find_one({"_id": ObjectId(event_id)})
    if not event:
        response = make_response(
            jsonify({"code": 404, "description": "Event not found"}),
            404,
        )
        return response

    # Check if the attendee is already registered
    for role in ["clients", "volunteers", "admins"]:
        participants = event["participants"].get(role, [])
        logging.debug(f"Role: {role}, Participants: {participants}")
        for participant in participants:
            logging.debug(f"Participant: {participant}, Type: {type(participant)}")
            if (
                isinstance(participant, dict)
                and participant.get("user_id") == participant_data["user_id"]
            ):
                response = make_response(
                    jsonify(
                        {
                            "code": 200,
                            "description": "Attendee is already registered for this event",
                        }
                    ),
                    200,
                )
                return response

    # Check if the event is full
    if "participants" in event:
        # Todo, add max_participants to event_details
        # if no max_participants is set, assume no limit
        max_participants = event.get("event_details", {}).get("max_participants", None)
        if max_participants is not None:
            total_participants = sum(
                len(event["participants"].get(role, []))
                for role in ["clients", "volunteers"]
            )
            if total_participants >= max_participants:
                response = make_response(
                    jsonify({"code": 400, "description": "Event is full"}),
                    400,
                )
                return response

    role = get_user(participant_data["user_id"])
    print(role)

    # Add the new participant to the correct role list in the event's participants
    events.update_one(
        {"_id": ObjectId(event_id)},
        {"$push": {f"participants.{role}": participant_data}},
    )

    # Retrieve the updated event document
    updated_event = events.find_one({"_id": ObjectId(event_id)})
    updated_event["_id"] = str(updated_event["_id"])

    response = make_response(
        jsonify({"code": 201, "description": "Event created.", "data": updated_event}),
        201,
    )
    return response


@app.route("/api/events/unregister", methods=["POST"])
def unregister_from_event():
    data = request.get_json()

    try:
        event_id = data.get("event_id")
        user_id = data.get("user_id")
    except Exception as e:
        response = make_response(
            jsonify(
                {
                    "code": 500,
                    "description": "Internal Server Error",
                    "data": {"error": str(e)},
                }
            ),
            500,
        )
        return response

    # Check if the event exists
    event = events.find_one({"_id": ObjectId(event_id)})
    if not event:
        response = make_response(
            jsonify({"code": 404, "description": "Event not found"}),
            404,
        )
        return response

    # Check if the attendee is registered
    if "participants" in event:
        participant = next(
            (p for p in event["participants"] if p["user_id"] == user_id), None
        )
        if not participant:
            response = make_response(
                jsonify(
                    {
                        "code": 404,
                        "description": "Attendee is not registered for this event",
                    }
                ),
                404,
            )
            return response
    else:
        response = make_response(
            jsonify(
                {
                    "code": 404,
                    "description": "Attendee is not registered for this event",
                }
            ),
            404,
        )
        return response

    # Remove the participant from the event's participants list
    events.update_one(
        {"_id": ObjectId(event_id)}, {"$pull": {"participants": {"user_id": user_id}}}
    )

    # Retrieve the updated event document
    updated_event = events.find_one({"_id": ObjectId(event_id)})
    updated_event["_id"] = str(updated_event["_id"])

    response = make_response(
        jsonify(
            {
                "code": 200,
                "description": "Attendee unregistered successfully",
                "data": updated_event,
            }
        ),
        200,
    )
    return response


# ==================User operations=======================


# Get user info
@app.route("/api/users/", methods=["POST"])
def get_user(user_id):
    try:
        user = users.find_one({"_id": ObjectId(user_id)})
        if user:
            user["_id"] = str(user["_id"])
            return jsonify(user), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Get user's events
@app.route("/api/users/get-events/<user_id>", methods=["POST"])
def get_users_events(user_id):
    try:
        all_events = list(events.find())
        event_list = []
        for event in all_events:
            event["_id"] = str(event["_id"])
            participants = (
                event["participants"]["clients"]
                + event["participants"]["volunteers"]
                + event["participants"]["admins"]
            )
            if user_id in participants:
                event_list.append(event["_id"])
        return jsonify(event_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/users/calendar/<user_id>", methods=["POST"])
def get_users_calendar(user_id):
    try:
        all_events = list(events.find())
        event_list = []
        for event in all_events:
            event["_id"] = str(event["_id"])
            participants = (
                event["participants"]["clients"]
                + event["participants"]["volunteers"]
                + event["participants"]["admins"]
            )
            if user_id in participants:
                event_list.append(
                    [
                        event["event_details"]["event_name"],
                        event["event_details"]["start_date"],
                        event["event_details"]["start_time"],
                        event["event_details"]["location"],
                        event["event_details"]["description"],
                    ]
                )
        print(event_list)
        return jsonify(event_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==================Main=======================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
