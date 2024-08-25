from flask import Flask, jsonify, request
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# MongoDB connection details
client = MongoClient(
    "mongodb+srv://mscodetogive:team12isthewinner@cluster0.xnb7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client["MSCodeToGive"]
users = db["users"]  # Collection for user registrations


@app.route("/api/users/sign-in", methods=["POST"])
def sign_in():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    usertype = data.get("usertype")

    # Find user by email
    user = users.find_one({"email": email, "usertype": usertype})

    if user and check_password_hash(user["password"], password):
        return jsonify({"message": "User signed in successfully"}), 200
    else:
        return jsonify({"error": "Sign in unsuccessful"}), 401


@app.route("/api/users/register", methods=["POST"])
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
    hashed_password = generate_password_hash(password)

    # Create new user
    user = {
        "usertype": usertype,
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "country_code": country_code,
        "contact_number": contact_number,
        "password": hashed_password,
        "ethnicity": ethnicity,
        "gender": gender,
    }

    users.insert_one(user)
    return jsonify({"message": "User registered successfully"}), 200


if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)
