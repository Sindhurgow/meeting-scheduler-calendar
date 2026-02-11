Meeting Scheduler API
This is a backend api for sheduling meetings between users. it handles creating users, booking meetings with overlap detection and managing shedules. built using Node.js, Express and PostgreSQL.

Features
User creation and authentication

Create meetings (checks for time conflicts)

Get all meetings or filter by user

Soft delete meetings (data is preserved)

Standard CRUD operations

Getting Started
Follow these steps to get the project runing on your local machine.

1. Clone the repo
Open your terminal and run this command to download the code:


git clone https://github.com/Sindhurgow/meeting-scheduler.git
cd meeting-scheduler
2. Install dependencies
You need to install the node modules. make sure you have nodejs installed first.


npm install
3. Setup .env
Create a file named .env in the root folder. You need to configure your database connection here. add this variables to the file:

PORT=3000
DB_NAME=meeting_db
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
Make sure your postgres database is running in background.

4. Run migrations
We are using sequelize to handle the database schema. The tables will be created automatically when you start the server because we use sync. just make sure the database meeting_db exists in your postgres.

5. Start server
To run the api in dev mode with nodemon:


npm run dev
If everything is ok you will see message "Database connected" and "Server running on port 3000".

API Endpoints
Users

POST /api/users - Create a new user

GET /api/users/:id - Get user details

Meetings

POST /api/meetings - Book a meeting

GET /api/meetings - Show all meetings

GET /api/meetings/user/:userId - Get meetings for specific user

DELETE /api/meetings/:id - Remove a meeting

