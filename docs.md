## General Documentation ##
# Admin Interface:
1. Manages events, client, and volunteer data.

# Client Interface:
1. Register for events
2. Unregister for events
3. Receives reminders about new events and events they have joined.

# Volunteer Interface:
1. Register for events
2. Unregister for events
3. Receives reminders similar to clients but might include additional volunteer-specific details.

## Specific Endpoints ##
# Register for event
URL: /events/<event_id>/register

Method: POST

Roles: Clients, Volunteers

URL Params:
event_id=[string] - The ID of the event to register for.

Data Params:
Required: None, since registration is done after account creation (please verify)

Success Response: (please change accordingly)
Code: 201 CREATED
Content: (please replace with dummy content)
{
  "_id": "5f723785bc778500044b3cfc",
  "event_id": "5f723785bc778500044b3cfb",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2023-09-15T12:00:00"
}

Error Responses:
Code: 404 NOT FOUND
Content: {"error": "Event not found"}
Code: 400 BAD REQUEST
Content: {"error": "Attendee is already registered for this event"}

# Unregister for event 
URL: /events/<event_id>/unregister

Method: POST

Roles: Clients, Volunteers

URL Params:
Required:
event_id=[string] - The ID of the event to unregister from

Data Params:
Required:
name=[string] - The name of the attendee.
email=[string] - The email address of the attendee.

Success Response:
Code: 200 OK
Content:
{
  "message": "Attendee unregistered successfully"
}

Error Responses:
Code: 404 NOT FOUND
Content: {"error": "Event not found"} or {"error": "Attendee is not registered for this event"}


# Sign in function
URL: /sign-in

METHOD: POST

Roles: Clients, Volunteers, Admin

URL Params: None

Data Params:
Required:
email=[string] - The email address of the attendee.
password=[string]
usertype=[string]

Success Response:
Code: 200 OK
Content:
{
  "message": "User signed in successfully"
}

Error Responses:
Content: {"error":"Sign in unsuccessful"}

# Sign up function
URL: /register

METHOD: POST

Roles: Clients, Volunteers, Admin

Data Params:
Required:
usertype=[single_select]
email=[string] - The email address of the attendee.
first_name=[string]
last_name=[string]
country_code=[int]
contact_number=[int]
password=[string]
confirm_password=[string]

Optional:
ethnicity=[drop_down]
gender=[single_select]


Success Response:
Code: 200 OK
Content:
{
  "message": "User registered successfully"
}

Error Responses:
Content: {"error":"User register unsuccessful"}

# Create a New Event/ Appointment
URL: /events/create

METHOD: POST

Roles: Admin

URL Params: None

Data Params:
Required:
event_name=[string]
event_start_date=[calendar]
event_start_time=[calendar]
event_end_date=[calendar]
event_end_time=[calendar]
location=[string]
quota=[int]
upload_image=[image]
description=[string]


Optional:
publish_date=[calendar]
publish_time=[calendar]
target_audience=[string]
event_tags=[string]

Success Response:
Code: 201 Created
Content:
{
  "event_id": "12345",
  "message": "Event created successfully"
}

Error Response:
Code: 400 Bad Request
Content: {"error": "Missing required fields"}


# Update an Event
URL: /events/update/<event_id>

METHOD: POST

Roles: Admin

URL Params: 
event_id=[string] - The ID of the event.

Data Params:
Optional:
event_name=[string]
event_start_date=[calendar]
event_start_time=[calendar]
event_end_date=[calendar]
event_end_time=[calendar]
location=[string]
quota=[int]
upload_image=[image]
description=[string]

Success Response:
Code: 201 Updated
Content:
{
  "event_id": "12345",
  "message": "Event updated successfully"
}

Error Response:
Code: 400 Bad Request
Content:
{"error": "No information provide for update"} 

# Delete an Event
URL: /events/delete/<event_id>

METHOD: POST

Roles: Admin

URL Params: 
event_id=[string] - The ID of the event.

Data Params:
event_name=[string]
reason=[string]

Success Response:
Code: 201 Deleted
Content:
{
  "event_id": "12345",
  "message": "Event deleted successfully"
}


Error Response:
Code: 400 Bad Request
Content:
{"error": "event does not exist"} 


# Sending Reminders
URL: /events/<event_id>/remind

METHOD: PUT/ POST

Roles: Admin

URL Params:
event_id=[string]

Data Params: None

Success Response:
Code: 201 Remind
{
  "event_id": "12345",
  "message": "Successfully reminded all participants"
}

Error Response:
Code: 400 Bad Request
Content:
{"error": "event does not exist"} 

# Finish watching a video
URL: volunteer/events/<event_id>/requirements

METHOD: POST

Roles: Volunteers

URL Params: 
event_id=[string]

Data Params: None

Success Response:
Code: 200 OK
{
  "event_id": "12345",
  "message": "Completed required video"
}

Error Response:
Code: 400 Bad Request
Content:
{"error": "event does not exist"} 


