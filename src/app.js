const express = require('express');
const {sequelize} = require('./config/database');

const meetingRoutes = require('./modules/meeting/routes/meeting.routes.js');
const userRoutes = require('./modules/user/routes/user.routes.js');

const User = require('./modules/user/model/user.model.js');
const Meeting = require('./modules/meeting/model/meeting.model.js');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

app.use('/api/meetings', meetingRoutes);
app.use('/api/users', userRoutes);

module.exports = app;