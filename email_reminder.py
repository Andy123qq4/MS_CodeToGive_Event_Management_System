import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from icalendar import Calendar, Event
from datetime import datetime, timedelta

# Connect to MongoDB
client = MongoClient(
    "mongodb+srv://mscodetogive:team12isthewinner@cluster0.xnb7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client["MSCodeToGive"]

# Email setup for Gmail
SMTP_SERVER = 'smtp.gmail.com'  # SMTP server for Gmail
SMTP_PORT = 587  # TLS port for Gmail
EMAIL_USER = os.getenv('EMAIL_USER')  # Your Gmail address
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')  # Your Gmail App Password

def create_ics_file(event_name, event_start, event_end, location, description):
    """
    Creates an .ics file with event details.
    
    :param event_name: Name of the event
    :param event_start: Event start datetime object
    :param event_end: Event end datetime object
    :param location: Event location
    :param description: Event description
    :return: The .ics file content as bytes
    """
    cal = Calendar()
    event = Event()
    event.add('summary', event_name)
    event.add('dtstart', event_start)
    event.add('dtend', event_end)
    event.add('location', location)
    event.add('description', description)
    cal.add_component(event)

    return cal.to_ical()

def send_email_with_ics(to_email, subject, body, ics_content):
    """
    Sends an email with an .ics attachment.

    :param to_email: Recipient email address
    :param subject: Email subject
    :param body: Email body text
    :param ics_content: The .ics file content as bytes
    """
    # Create a MIME multipart message
    msg = MIMEMultipart()
    msg['From'] = EMAIL_USER
    msg['To'] = to_email
    msg['Subject'] = subject

    # Attach the email body
    msg.attach(MIMEText(body, 'plain'))

    # Attach the .ics file
    part = MIMEBase('application', "octet-stream")
    part.set_payload(ics_content)
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', 'attachment; filename="reminder.ics"')
    msg.attach(part)

    # Send the email
    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()  # Secure the connection
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        print(f"Email sent to {to_email} with .ics attachment.")
    except Exception as e:
        print(f"Failed to send email to {to_email}: {e}")

def main():
    # Event details
    event_name = "Counselling Session for Ammy"
    event_start = datetime(2024, 7, 28, 10, 0, 0)  # 10:00 AM UTC
    event_end = event_start + timedelta(hours=1)  # 1 hour event
    location = "Online"
    description = "Join us for a counselling session!"

    # Create .ics file content
    ics_content = create_ics_file(event_name, event_start, event_end, location, description)
    
    # Hardcoded list of user emails
    to_emails = [
        'nur.ali.talg@gmail.com',  # Replace with actual email addresses
        # 'user2@example.com',       # Add more recipients as needed
        # 'user3@example.com'
    ]

    # Email details
    subject = "Reminder: Upcoming Counselling Session"
    body = f"Dear Participant,\n\nThis is a reminder for the upcoming event: {event_name}.\n\nLooking forward to your participation.\n\nBest Regards,\nYour Event Team"

    # Send emails with .ics attachment
    for to_email in to_emails:
        send_email_with_ics(to_email, subject, body, ics_content)

if __name__ == "__main__":
    main()
