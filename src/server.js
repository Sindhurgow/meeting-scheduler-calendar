require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./config/database');

const Meeting = require('./modules/meeting/model/meeting.model');
const User = require('./modules/user/model/user.model');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established.');

        User.hasMany(Meeting, { foreignKey: 'userId' });
        Meeting.belongsTo(User, { foreignKey: 'userId' });

        await sequelize.sync({ alter: true });
        console.log('Database synchronized.');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Server failed to start:', error);
        process.exit(1); 
    }
};

startServer();