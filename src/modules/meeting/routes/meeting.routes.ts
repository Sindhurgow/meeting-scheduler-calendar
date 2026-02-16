import { Router } from 'express';
import * as meetingController from '../index/index'; 

const router = Router();

router.post('/', meetingController.createMeeting);
router.get('/', meetingController.getAllMeetings);
router.get('/user/:userId', meetingController.getMeetingsByUserId);
router.put('/:id', meetingController.updateMeeting);
router.delete('/:id', meetingController.deleteMeeting);

export default router;