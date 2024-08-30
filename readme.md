# Event Management Platform for the Zubin Foundation

This repository hosts the code for an **end-to-end event management platform** developed collaboratively by a team of 8 software developers. The platform is designed to streamline the planning, registration, and management of events, enhancing the interaction between admins, volunteers and clients for the Zubin Foundation.

## Features

- **User Registration**: Enables easy sign-up for attendees, improving accessibility and user engagement.
- **Event Scheduling**: Allows admins to efficiently manage event timelines.
- **Notification System**: Automated Whatsapp and email reminders to ensure participants are informed and engaged.
- **AI Chatbot**: Personalised assistance on Zubin Foundation or event management platform-related enquiries.
- **Gamification**: Badges and achievements for completing training videos.

## Technologies Used

- **Frontend**: Next.js for efficient state management.
- **Backend**: Flask for robust server-side logic.
- **Database**: MongoDB for scalable data storage.
- **APIs**: Twilio for WhatsApp Messaging, Relicate for Chatbot.

## Getting Started

Follow these instructions to set up the project locally.

## Prerequisites

To set up the project locally, follow these instructions:

### Frontend Setup

- Install [Node.js](https://nodejs.org/en/download/)
- Install npm

    ```bash
    npm install
    ```

### Backend Setup

1. Open a terminal and navigate to the `backend` directory.
2. [Optional] Setup your `Replicate` in [Controller.py](backend/Controller.py) and `Twilio` in ([whatsapp_reminder.py](backend/whatsapp_reminder.py)) API 
3. Install the required dependencies by running the following command:

     ```bash
     pip install -r requirements.txt
     ```

## Running the Project

1. Open two separate terminals.
2. In the first terminal, navigate to the `backend` directory and run the backend server by executing the following command:

```bash
python Controller.py
```

3. In the second terminal, navigate to the `frontend` and run the frontend server by executing the following command:

```bash
npm run dev
```

Connect to the provided localhost URL to access the frontend.

Make sure to run the backend and frontend on your localhost to access the project locally.

## Video Demonstration

For a comprehensive overview of the event management system's features, you can watch the demonstration video below:

[![video demonstration](asset/Snipaste_2024-08-26_09-56-56.png)](https://www.youtube.com/watch?v=SVCQNC5lZ94)

## Additional Notes

More photos showcasing our platform can be found in the project's [asset folder](asset).
