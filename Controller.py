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
users = db["users"]
accounts = db["accounts"]
badges = db["badges"]
trainings = db["trainings"]
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
        "created_time": datetime.now(),
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
# @app.route("/events/<event_id>/register", methods=["POST"])
@app.route("/events/register", methods=["POST"])
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
    if "participants" in event:
        for participant in event["participants"]:
            if participant["user_id"] == participant_data["user_id"]:
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
            max_participants = event.get("event_details", {}).get(
                "max_participants", None
            )
            if max_participants is not None:
                if len(event["participants"]) >= max_participants:
                    response = make_response(
                        jsonify({"code": 400, "description": "Event is full"}),
                        400,
                    )
                    return response

    # Add the new participant to the event's participants list
    events.update_one(
        {"_id": ObjectId(event_id)}, {"$push": {"participants": participant_data}}
    )

    # Retrieve the updated event document
    updated_event = events.find_one({"_id": ObjectId(event_id)})
    updated_event["_id"] = str(updated_event["_id"])

    response = make_response(
        jsonify({"code": 201, "description": "Created", "data": updated_event}), 201
    )
    return response


@app.route("/events/unregister", methods=["POST"])
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


@app.route("/user/sign-up", methods=["POST"])
def create_user():
    data = request.get_json()

    # frontend should check
    # Validate input data
    # if not data or not data.get("email") or not data.get("password"):
    #     return make_response(jsonify({"error": "Missing required fields"}), 400)

    # Check if user already exists
    if accounts_collection.find_one({"email": data["email"]}):
        return make_response(jsonify({"error": "User already exists"}), 400)

    # Hash the password
    hashed_password = generate_password_hash(data["password"], method="sha256")

    # Create new user document
    new_user = {
        "first_name": data.get("first_name", ""),
        "last_name": data.get("last_name", ""),
        "country_code": data.get("country_code", ""),
        "contact_number": data.get("contact_number", ""),
        "ethnicity": data.get("ethnicity", ""),
        "gender": data.get("gender", ""),
    }

    # Insert the new user into the users collection
    user_result = users_collection.insert_one(new_user)
    user_id = str(user_result.inserted_id)

    # Create new account document
    new_account = {
        "email": data["email"],
        "password": hashed_password,
        "user_id": user_id,
    }

    # Insert the new account into the accounts collection
    account_result = accounts_collection.insert_one(new_account)
    new_account["_id"] = str(account_result.inserted_id)

    # Return success response
    return make_response(
        jsonify(
            {
                "message": "User registered successfully",
                "user_data": new_user,
                "account_data": new_account,
            }
        ),
        201,
    )


# ==================Main=======================

if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)
