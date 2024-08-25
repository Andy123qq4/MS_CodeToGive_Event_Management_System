from flask import Flask, jsonify, request, make_response
from datetime import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId
import logging

app = Flask(__name__)
log = logging.getLogger(__name__)


# Connect to MongoDB
client = MongoClient(
    "mongodb+srv://mscodetogive:team12isthewinner@cluster0.xnb7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client["MSCodeToGive"]

events = db["event"]
users = db["users"]
badges = db["badges"]
trainings = db["trainings"]
registrations = db["registrations"]


# Get user info
@app.route("/users/<user_id>", methods=["POST"])
def get_user():
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
@app.route("/usersevents/<user_id>", methods=["POST"])
def get_users_events():
    try:
        all_events = list(events.find())
        event_list = []
        for event in all_events:
            event["_id"] = str(event["_id"])
            participants = event["participants"]["clients"] + event["participants"]["volunteers"] + event["participants"]["admins"]
            if user_id in participants:
                event_list.append(event["_id"])
        return jsonify(event_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/userscalendar/<user_id>", methods=["POST"])
def get_users_calendar():
    try:
        all_events = list(events.find())
        event_list = []
        for event in all_events:
            event["_id"] = str(event["_id"])
            participants = event["participants"]["clients"] + event["participants"]["volunteers"] + event["participants"]["admins"]
            if user_id in participants:
                event_list.append([event["event_details"]["event_name"], event["event_details"]["start_date"], event["event_details"]["start_time"], event["event_details"]["location"], event["event_details"]["description"]])
        print(event_list)
        return jsonify(event_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==================Main=======================
"""
if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)
"""