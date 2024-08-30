from flask import Flask, jsonify, request, make_response
from datetime import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId
import logging
import openai  # pip install openai==0.28 (old version)
import ast
import requests

app = Flask(__name__)
log = logging.getLogger(__name__)

# Connect to MongoDB
client = MongoClient(
    "mongodb+srv://mscodetogive:team12isthewinner@cluster0.xnb7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client["MSCodeToGive"]

events = db["event"]
users_collection = db["users"]
accounts_collection = db["accounts"]
badges = db["badges"]
trainings = db["trainings"]
registrations = db["registrations"]

# Configure OpenAI API
openai.api_key = "40e3ab52523d497687165ec0ca61a36b"  # new key
openai.api_base = "https://hkust.azure-api.net"  # your endpoint should look like the following https://YOUR_RESOURCE_NAME.openai.azure.com/
# openai.api_type = "azure"
# openai.api_version = "2023-05-15"  # this may change in the future
deployment_name = "gpt-35-turbo"  # This will correspond to the custom name you chose for your deployment when you deployed a model.

# ==================Event operations=======================
# (Event operations code here...)

# ==================Registration operations=======================
# (Registration operations code here...)

# ==================User operations=======================
# (User operations code here...)

# ==================Keyword operations=======================


@app.route("/keyword", methods=["POST"])
def keywords():
    data = request.get_json()
    payload = data.get("payload")

    url = f"https://hkust.azure-api.net/openai/deployments/{deployment_name}/chat/completions?api-version=2024-06-01"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openai.api_key}",
    }
    body = {
        "temperature": 0,
        "max_tokens": 100,
        "messages": [
            {"role": "system", "content": system_prompt},
            {
                "role": "system",
                "content": "Make sure you understand the input, and you can always make assumptions of the input and suggest the top three possibilities.",
            },
            {"role": "system", "name": "example_user", "content": ask1},
            {"role": "system", "name": "example_assistant", "content": ans1},
            {"role": "system", "name": "example_user", "content": ask2},
            {"role": "system", "name": "example_assistant", "content": ans2},
            {"role": "system", "name": "example_user", "content": ask3},
            {"role": "system", "name": "example_assistant", "content": ans3},
            {"role": "system", "name": "example_user", "content": ask4},
            {"role": "system", "name": "example_assistant", "content": ans4},
            {"role": "system", "name": "example_user", "content": ask5},
            {"role": "system", "name": "example_assistant", "content": ans5},
            {
                "role": "user",
                "content": "I want to pitch an ETF about'"
                + payload
                + "', what should I do?",
            },
        ],
    }

    response = requests.post(url, headers=headers, json=body)
    response_data = response.json()

    content = response_data["choices"][0]["message"]["content"]
    start_index = content.find("{")
    end_index = content.find("}")
    trimmed_content = content[start_index : end_index + 1]
    query_dict = ast.literal_eval(trimmed_content)

    return jsonify(query_dict)


# ==================Main=======================

if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)
