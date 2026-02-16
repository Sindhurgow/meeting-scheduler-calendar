import { Router } from 'express';
import userRoutes from '../modules/user/routes/user.routes';
import meetingRoutes from '../modules/meeting/routes/meeting.routes';

const router = Router();

router.use('/users', userRoutes);

router.use('/meetings', meetingRoutes);

export default router;