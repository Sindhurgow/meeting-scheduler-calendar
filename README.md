# Meeting Scheduler API 

This is a backend api for sheduling meetings between users. It handles creating users, booking meetings with overlap detection, and managing shedules. Built using **Node.js, Express, and PostgreSQL** with Sequelize ORM.

## Features
* **User Management**: Simple user creation to associate meetings.
* **Conflict Detection**: Automatically checks for time conflicts (you can't book two meetings at the same time for the same user!).
* **Duration Validation**: Prevents "impossible" meetings where the end time is before or equal to the start time.
* **Advanced Filters**: Search meetings by `userId`, or a specific date range (`startDate` to `endDate`).
* **Soft Delete**: Uses Sequelize "paranoid" mode so meetings are hidden from the API but preserved in the DB for audit.
* **Standard CRUD**: Full support for updating and deleting meeting details.



---

## Getting Started

### 1. Clone the repo
Open your terminal and run this command:
```bash
git clone [https://github.com/Sindhurgow/meeting-scheduler-calendar](https://github.com/Sindhurgow/meeting-scheduler-calendar)
cd meeting-scheduler


### 2. Install dependencies
```bash
npm install
```

### 3. Set up your database
- Create a PostgreSQL database.
- Update the `config/config.json` file with your database credentials.

### 4. Run migrations
```bash
npx sequelize-cli db:migrate
```

### 5. Start the server
```bash
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

Users
- `POST /users` - Create a new user
- `GET /users` - List all users

Meetings
- `POST /meetings` - Create a new meeting
- `GET /meetings` - List all meetings
- `GET /meetings?userId=1` - List meetings for a specific user
- `GET /meetings?startDate=2023-11-01&endDate=2023-11-30` - List meetings within a date range
- `PUT /meetings/:id` - Update a meeting
- `DELETE /meetings/:id` - Delete a meeting

Technical Notes (The "Fine Print")
Timezones: All dates must be sent in ISO 8601 format (UTC). For example: 2026-02-20T14:00:00Z.

Validation: If you try to book a meeting where startTime >= endTime, the API returns a 400 Bad Request.

Conflict Logic: The overlap check ensures that start < existing_end AND end > existing_start.

Soft Deletes: Deleted meetings will have a deletedAt timestamp in the database but won't show up in regular GET reqeusts.

Filter Logic: When using startDate and endDate filters, the API looks at the startTime of the meetings to filter.