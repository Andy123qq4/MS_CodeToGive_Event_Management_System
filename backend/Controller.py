from flask import Flask, jsonify, request, make_response

# from werkzeug.security import generate_password_hash, check_password_hash
import os
from flask_cors import CORS, cross_origin
from datetime import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId
from whatsapp_reminder import send_whatsapp_message
import logging
import replicate
from replicate.client import Client

# import openai  # pip install openai==0.28 (old version)

log = logging.getLogger(__name__)
app = Flask(__name__)
app.config["CORS_HEADERS"] = "Content-Type"
CORS(
    app,
    resources={r"/*": {"origins": "*"}},
)

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
# accounts = db["accounts"]
badges = db["badges"]
# trainings = db["trainings"]
# registrations = db["registrations"]


@app.before_request
def handle_options_request():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, DELETE")
        response.headers.add(
            "Access-Control-Allow-Headers", "Content-Type, Authorization"
        )
        return response


# ==================Event operations=======================


# Create a new event
@app.route("/api/events/create/", methods=["POST"])
@cross_origin()
def create_event():
    data = request.get_json()

    # Create a new event
    event = {
        "createState": "Finished",
        "isPublished": data.get("isPublished", False),
        "isAppointment": data.get("isAppointment"),
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
        "isAppointment": False,
    }

    # optional isAppointment
    if "isAppointment" in data:
        event["isAppointment"] = data["isAppointment"]

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
@app.route("/api/events/get-all/", methods=["GET"])
@cross_origin()
def get_all_events():
    try:
        all_events = list(events.find())
        for event in all_events:
            event["_id"] = str(event["_id"])
        return jsonify(all_events), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Get a specific event
@app.route("/api/events/get-specific/", methods=["POST"])
@cross_origin()
def get_event():
    data = request.get_json()
    try:
        event_id = data.get("event_id")
        event = events.find_one({"_id": ObjectId(event_id)})
        if event:
            event["_id"] = str(event["_id"])
            return jsonify(event), 200
        else:
            return jsonify({"error": "Event not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Update an event
# Todo, change to POST
@app.route("/api/events/update/<event_id>", methods=["POST"])
@cross_origin()
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
# Todo, change to POST
@app.route("/api/events/delete/<event_id>", methods=["DELETE"])
@cross_origin()
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
@app.route("/api/events/register/", methods=["POST"])
@cross_origin()
def register_for_event():
    data = request.get_json()

    try:
        event_id = data.get("event_id")
        participant_data = {
            "user_id": data.get("user_id"),
            "registered_at": datetime.now(),
        }
        usertype = users.find_one({"_id": ObjectId(participant_data["user_id"])}).get(
            "usertype"
        )
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
    participants = event["participants"].get(usertype + "s", [])
    for participant in participants:
        if participant.get("user_id") == participant_data["user_id"]:
            response = make_response(
                jsonify(
                    {
                        "code": 400,
                        "description": "Attendee is already registered for this event",
                    }
                ),
                400,
            )
            return response

    # Check if the event is full
    if "participants" in event:
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

    user = users.find_one({"_id": ObjectId(participant_data["user_id"])})
    role = user.get("usertype") + "s"
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
        jsonify(
            {
                "code": 201,
                "description": "Registered the event!.",
                "data": updated_event,
            }
        ),
        201,
    )
    return response


@app.route("/api/events/unregister/", methods=["POST"])
@cross_origin()
def unregister_from_event():
    data = request.get_json()

    try:
        event_id = data.get("event_id")
        user_id = data.get("user_id")
        user = users.find_one({"_id": ObjectId(user_id)})
        role = user.get("usertype") + "s"
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
    participants = event["participants"].get(role, [])
    participant = next((p for p in participants if p["user_id"] == user_id), None)
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

    # Remove the participant from the event's participants list
    events.update_one(
        {"_id": ObjectId(event_id)},
        {"$pull": {f"participants.{role}": {"user_id": user_id}}},
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


@app.route("/api/users/sign-in/", methods=["POST"])
@cross_origin()
def sign_in():
    data = request.get_json()

    try:
        email = data.get("email")
        password = data.get("password")
        usertype = data.get("usertype")

        # Find user by email
        user = users.find_one({"email": email, "usertype": usertype})

        if user and user["password"] == password:
            user_id = str(user["_id"])
            response = make_response(
                jsonify(
                    {
                        "code": 200,
                        "description": "User signed in successfully",
                        "data": user_id,
                    }
                ),
                200,
            )
            return response
        else:
            return jsonify({"error": "Invalid email/password."}), 401
    except Exception as e:
        return jsonify({"error": "Invalid JSON data", "message": str(e)}), 400


@app.route("/api/users/sign-up/", methods=["POST"])
@cross_origin()
def sign_up():
    data = request.get_json()

    # Ensure all required fields are provided
    required_fields = [
        "usertype",
        "email",
        "first_name",
        "last_name",
        "country_code",
        "contact_number",
        "password",
        "confirm_password",
    ]
    missing_fields = [
        field for field in required_fields if field not in data or not data[field]
    ]

    if missing_fields:
        return (
            jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}),
            400,
        )

    usertype = data.get("usertype")
    email = data.get("email")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    country_code = data.get("country_code")
    contact_number = data.get("contact_number")
    password = data.get("password")
    confirm_password = data.get("confirm_password")
    ethnicity = data.get("ethnicity")
    gender = data.get("gender")

    # Check if passwords match
    if password != confirm_password:
        return jsonify({"error": "Passwords do not match"}), 400

    # Check if user already exists
    existing_user = users.find_one({"email": email})
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    # Hash the password
    # password = generate_password_hash(password)

    # Create new user
    user = {
        "usertype": usertype,
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "country_code": country_code,
        "contact_number": contact_number,
        "password": password,
        "ethnicity": ethnicity,
        "gender": gender,
    }
    result = users.insert_one(user)
    user_id = str(result.inserted_id)
    response = make_response(
        jsonify(
            {
                "code": 200,
                "description": "User registered successfully",
                "data": user_id,
            }
        ),
        200,
    )
    return response


# Get user info
@app.route("/api/users/", methods=["POST"])
@cross_origin()
def get_user():
    data = request.get_json()
    try:
        user_id = data.get("user_id")
        user = users.find_one({"_id": ObjectId(user_id)})
        if user:
            user["_id"] = str(user["_id"])
            response = make_response(
                jsonify({"code": 200, "description": "User found!", "data": user}),
                200,
            )
            return response
        else:
            response = make_response(
                jsonify({"code": 404, "description": "User not found!", "data": {}}),
                404,
            )
            return response
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


# Get user info for WhatsApp
@app.route("/api/userswhatsapp/", methods=["POST"])
@cross_origin()
def get_userswhatsapp():
    data = request.get_json()
    try:
        user_id = data.get("user_id")
        user = users.find_one({"_id": ObjectId(user_id)})
        if user:
            user["_id"] = str(user["_id"])
            user["contact_number"] = user["country_code"] + user["contact_number"]
            response = make_response(
                jsonify({"code": 200, "description": "User found!", "data": user}),
                200,
            )
            return response
        else:
            response = make_response(
                jsonify({"code": 404, "description": "User not found!", "data": {}}),
                404,
            )
            return response
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


# Get user's events
@app.route("/api/users/get-events", methods=["GET"])
@cross_origin()
def get_users_events():
    try:
        user_id = request.args.get("user_id")
        # user_id = data.get("user_id")
        # print(1)
    except Exception as e:
        response = make_response(
            jsonify(
                {"code": 400, "description": "Bad Request", "data": {"error": str(e)}}
            ),
            400,
        )
        return response

    try:
        user = users.find_one({"_id": ObjectId(user_id)})
        if not user:
            response = make_response(
                jsonify({"code": 404, "description": "User not found", "data": {}}),
                404,
            )
            return response

        role = user.get("usertype") + "s"
        print(role)
        all_events = list(events.find())
        event_list = []

        for event in all_events:
            event["_id"] = str(event["_id"])

            # Check if role exists in participants
            if role in event["participants"]:
                participants = event["participants"][role]
            else:
                print(f"Role {role} not found in participants")
                participants = []

            if any(participant["user_id"] == user_id for participant in participants):
                event_list.append(event)

        response = make_response(
            jsonify(
                {
                    "code": 200,
                    "description": "User events retrieved successfully",
                    "data": event_list,
                }
            ),
            200,
        )
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


@app.route("/api/users/justforyou", methods=["GET"])
def get_events_for_user():
    try:
        user_id = request.args.get("user_id")
        all_events = list(events.find())
        event_list = []
        user_char_list = []
        event_char_list = []

        user = users.find_one({"_id": ObjectId(user_id)})
        if user:
            user["_id"] = str(user["_id"])
        # else:
        # return jsonify({"error": "User not found"}), 404
        user_char_list.append(user["ethnicity"])
        user_char_list.append(user["gender"])

        for event in all_events:
            event_char_list = []
            event["_id"] = str(event["_id"])
            event_char_list += event["event_details"]["target_audience"]
            event_char_list += event["event_details"]["event_tags"]
            # event_char_list v.s. user_char_list
            for user_char in user_char_list:
                if user_char in event_char_list:
                    event_char_list.remove(user_char)
            if len(event_char_list) == 0:
                event_list.append(event)
        return jsonify(event_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/users/calendar/", methods=["GET"])
def get_users_calendar():
    try:
        user_id = request.args.get("user_id")
        print(f"User ID: {user_id}")
    except Exception as e:
        return (
            jsonify(
                {"code": 400, "description": "Bad Request", "data": {"error": str(e)}}
            ),
            400,
        )

    try:
        user = users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return (
                jsonify({"code": 404, "description": "User not found", "data": {}}),
                404,
            )

        role = user.get("usertype") + "s"
        print(f"Role: {role}")
        all_events = list(events.find())
        event_list = []

        for event in all_events:
            event["_id"] = str(event["_id"])
            print(f"Event ID: {event['_id']}")
            print(f"Participants: {event['participants']}")

            if role in event["participants"]:
                participants = event["participants"][role]
                print(f"Participants for role {role}: {participants}")
            else:
                print(f"Role {role} not found in participants")
                participants = []

            if any(participant["user_id"] == user_id for participant in participants):
                event_list.append(event)

        print(event_list)
        return (
            jsonify(
                {
                    "code": 200,
                    "description": "User's calendar events retrieved successfully",
                    "data": event_list,
                }
            ),
            200,
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Get all users
@app.route("/api/users/get-all", methods=["GET"])
def get_all_users():
    try:
        all_users = list(users.find())
        for user in all_users:
            user["_id"] = str(user["_id"])
        return jsonify(all_users), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ===============Send Reminders=====================
@app.route("/api/events/send-reminder/", methods=["POST"])
def handle_send_message():
    data = request.get_json()
    try:
        event_id = data.get("event_id")
        event = events.find_one({"_id": ObjectId(event_id)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    event_name = event["event_details"]["event_name"]
    start_date = event["event_details"]["start_date"]
    event_location = event["event_details"]["location"]
    start_time = event["event_details"]["start_time"]
    end_time = event["event_details"]["end_time"]
    end_date = event["event_details"]["end_date"]
    message = "Please bring along your personal cutlery!"

    sample_message = (
        f"🔔 Thank you for signing up for {event_name} with Zubin Foundation! It is happening on {start_date} at {start_time}.\n"
        f" The event will be held at {event_location}. {message}"
    )
    # Hardcoded list of user phone numbers
    users = [
        'whatsapp:+85290473671', # Replace with actual WhatsApp numbers
        'whatsapp:+85294844936',
        'whatsapp:+85297992105'
        # 'whatsapp:+85253192036'
        # 'whatsapp:+85234567890',
        # 'whatsapp:+85245678901'
    ]

    try:
        for phone_number in users:
            send_whatsapp_message(phone_number, sample_message)
        return jsonify({"status": "success", "message": "Message sent successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==================Chatbot=======================


@app.route("/api/chatbot/", methods=["POST"])
def chatbot():
    replicate = Client(api_token="r8_5t2aobLKd4sOf1AKIvPq3zOLYKVkxiF083bcg")
    data = request.get_json()
    try:
        query = data.get("query")
        # input = {
        #     "prompt": query,
        #     "max_new_tokens": 512,
        #     "prompt_template": "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
        # }
        # response = []
        # for word in replicate.stream("meta/meta-llama-3-8b-instruct", input=input):
        #     response.append(word)
        # print(response, end="")
        output = replicate.run(
            "meta/meta-llama-3-8b-instruct",
            input={
                "debug": False,
                "top_k": 50,
                "top_p": 1,
                "prompt": query,
                "temperature": 0,
                # "system_prompt": default_system_prompt,
                "max_new_tokens": 128,
                "min_new_tokens": -1,
            },
        )

        return jsonify({"response": "".join(output)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==================Main=======================

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
