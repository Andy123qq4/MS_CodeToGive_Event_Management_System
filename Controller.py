from flask import Flask, jsonify, request, make_response
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

# Configure OpenAI API
# openai.api_key = "40e3ab52523d497687165ec0ca61a36b"  # new key
# openai.api_base = "https://hkust.azure-api.net"  # your endpoint should look like the following https://YOUR_RESOURCE_NAME.openai.azure.com/
# openai.api_type = "azure"
# openai.api_version = "2023-05-15"  # this may change in the future
# deployment_name = "gpt-35-turbo"  # This will correspond to the custom name you chose for your deployment when you deployed a model.


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
@app.route("/api/clients", methods=["GET"])
def get_all_events():
    try:
        all_events = list(events.find())
        for event in all_events:
            event["_id"] = str(event["_id"])
        return jsonify(all_events), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Get a specific event
@app.route("/api/events/<event_id>", methods=["POST"])
def get_event():
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
@app.route("/api/events/<event_id>", methods=["POST"])
def update_event():
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

    if ((event["event_details"]["event_name"]) !=  (updated_event["event_details"]["event_name"])):
        return jsonify({"error": "cannot change the event name"}), 500
    if ((event["created_by"]) !=  (updated_event["created_by"])):
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
@app.route("/api/events/<event_id>", methods=["POST"])
def delete_event():
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
# @app.route("/api/events/<event_id>/register", methods=["POST"])
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


# @app.route("/api/user/sign-up", methods=["POST"])
# def create_user():
#     data = request.get_json()

#     # frontend should check
#     # Validate input data
#     # if not data or not data.get("email") or not data.get("password"):
#     #     return make_response(jsonify({"error": "Missing required fields"}), 400)

#     # Check if user already exists
#     if accounts_collection.find_one({"email": data["email"]}):
#         return make_response(jsonify({"error": "User already exists"}), 400)

#     # Hash the password
#     hashed_password = generate_password_hash(data["password"], method="sha256")

#     # Create new user document
#     new_user = {
#         "first_name": data.get("first_name", ""),
#         "last_name": data.get("last_name", ""),
#         "country_code": data.get("country_code", ""),
#         "contact_number": data.get("contact_number", ""),
#         "ethnicity": data.get("ethnicity", ""),
#         "gender": data.get("gender", ""),
#     }

#     # Insert the new user into the users collection
#     user_result = users_collection.insert_one(new_user)
#     user_id = str(user_result.inserted_id)

#     # Create new account document
#     new_account = {
#         "email": data["email"],
#         "password": hashed_password,
#         "user_id": user_id,
#     }

#     # Insert the new account into the accounts collection
#     account_result = accounts_collection.insert_one(new_account)
#     new_account["_id"] = str(account_result.inserted_id)

#     # Return success response
#     return make_response(
#         jsonify(
#             {
#                 "message": "User registered successfully",
#                 "user_data": new_user,
#                 "account_data": new_account,
#             }
#         ),
#         201,
#     )


# ==================Main=======================

if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)
