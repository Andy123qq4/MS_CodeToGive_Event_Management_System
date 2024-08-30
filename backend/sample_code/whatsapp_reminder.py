from pymongo import MongoClient
from twilio.rest import Client
from bson import ObjectId  # Import ObjectId to query MongoDB using ObjectID

# Connect to MongoDB
client = MongoClient(
    "mongodb+srv://mscodetogive:team12isthewinner@cluster0.xnb7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client["MSCodeToGive"]
users = db["users"]

# Twilio setup (use your provided Twilio credentials)
account_sid = 'AC563a1ebd79285971e2cc35686654f09b'  # Your Twilio Account SID
auth_token = '6b1c03162dec073f144245f259194186'  # Your Twilio Auth Token
TWILIO_WHATSAPP_NUMBER = 'whatsapp:+14155238886'  # Twilio Sandbox WhatsApp number

# Create Twilio client
twilio_client = Client(account_sid, auth_token)

def send_whatsapp_message(to_number, message_body):
    """
    Sends a WhatsApp reminder message using Twilio API.

    :param to_number: The recipient's WhatsApp number (e.g., 'whatsapp:+1234567890')
    :param message_body: The message text to send.
    """
    try:
        message = twilio_client.messages.create(
            body=message_body,
            from_=TWILIO_WHATSAPP_NUMBER,
            to=to_number
        )
        print(f"Message sent to {to_number}: {message.sid}")
    except Exception as e:
        print(f"Failed to send message to {to_number}: {e}")

def main():
    # List of ObjectIDs to query
    object_ids = [
        ObjectId("66cab5a4ad8ae30434b9ac95"),
        ObjectId("66c9bd8643e62a1474adbbe6"),
        ObjectId("66caf2dcd7fe88b53e58871c")
    ]

    # Query MongoDB to fetch users with specified ObjectIDs
    registered_users = users.find({"_id": {"$in": object_ids}})

    # Define the sample message
    event_name = "Counselling session for Ammy"
    event_date = "Sun, July 28, 2024"
    event_time = "10:00 AM UTC"
    event_link = "https://en.wikipedia.org/wiki/Consolation"
    sample_message = (
        f"🔔 Reminder: {event_name} is happening on {event_date} at {event_time}.\n"
        f"Join the event here: {event_link}"
    )

    # Send WhatsApp messages to each user
    for user in registered_users:
        country_code = user.get('country_code', '')
        contact_number = user.get('contact_number', '')

        if country_code and contact_number:
            phone_number = f'whatsapp:{country_code}{contact_number}'
            send_whatsapp_message(phone_number, sample_message)

if __name__ == "__main__":
    main()
