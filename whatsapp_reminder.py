import os
from twilio.rest import Client
from pymongo import MongoClient


# Connect to MongoDB
client = MongoClient(
    "mongodb+srv://mscodetogive:team12isthewinner@cluster0.xnb7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client["MSCodeToGive"]
users = db["users"]


# Twilio setup (retrieve credentials from environment variables)

# Please replace the account_sid and the auth_token with your own Twilio credentials
account_sid = 'AC563a1ebd79285971e2cc35686654f09b'
auth_token = '6b1c03162dec073f144245f259194186'


TWILIO_WHATSAPP_NUMBER = 'whatsapp:+14155238886' # Use Twilio Sandbox number for testing

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
            from_=TWILIO_WHATSAPP_NUMBER,  # Your Twilio sandbox WhatsApp number
            to=to_number
        )
        print(f"Message sent to {to_number}: {message.sid}")
    except Exception as e:
        print(f"Failed to send message to {to_number}: {e}")

def main():
    # Define the sample message
    event_name = "Counselling session for Ammy"
    event_date = "Sun, July 28, 2024"
    event_time = "10:00 AM UTC"
    event_link = "https://en.wikipedia.org/wiki/Python_(programming_language)"
    sample_message = (
        f"🔔 Reminder: {event_name} is happening on {event_date} at {event_time}.\n"
        f"Join the event here: {event_link}"
    )

    # Hardcoded list of user phone numbers
    users = [
        'whatsapp:+85290473671', # Replace with actual WhatsApp numbers
        'whatsapp:+85294844936'
        # 'whatsapp:+85253192036'
        # 'whatsapp:+85234567890',
        # 'whatsapp:+85245678901'
    ]

    # Send WhatsApp messages to each user


if __name__ == "__main__":
    main()
