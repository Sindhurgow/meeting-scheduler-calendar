import express, { Application } from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database'; 
import rootRouter from './routes/index';
import { errorHandler } from './middlewares/errorHandler';

import User from './modules/user/model/user.model';
import Meeting from './modules/meeting/model/meeting.model';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.use('/api', rootRouter);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start the server.', error);
        process.exit(1); 
    };
};

startServer();

app.use(errorHandler);