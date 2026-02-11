const express = require('express');
const meetingController = require('../interface/meeting.interface');

const router = express.Router();

router.post('/', meetingController.createMeeting);

router.get('/', meetingController.getAllMeetings);

router.get('/user/:userId', meetingController.getMeetingsByUserId);

router.get('/:id', meetingController.getMeetingsById);

router.delete('/:id', meetingController.deleteMeetingById);

router.put('/:id', meetingController.updateMeetingById);

module.exports = router;