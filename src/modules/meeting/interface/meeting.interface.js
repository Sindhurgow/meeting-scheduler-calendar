const meetingService = require('../service/meeting.service'); 

class MeetingController {

    async createMeeting(req, res) {
        try {
            const { title, startTime, endTime, userId } = req.body;

            if (!title || !startTime || !endTime || !userId) {
                return res.status(400).json({ 
                    message: 'Title, startTime, endTime, and userId are required.' 
                });
            }

            const newMeeting = await meetingService.createMeeting(req.body);

            res.status(201).json({
                message: 'Meeting created successfully!',
                meeting: newMeeting
            });

        } catch (error) {
            if (error.message === 'Time slot already booked.') {
                return res.status(400).json({ message: error.message });
            }
            if (error.message === 'Start time must be before end time') {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    }

    async getAllMeetings(req, res) {
        try {
            const meetings = await meetingService.getAllMeetings();
            res.status(200).json(meetings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getMeetingsByUserId(req, res){
        try {
            const {userId} = req.params;
            const meetingsByUserId = await meetingService.getMeetingsByUserId(userId);
            res.status(200).json(meetingsByUserId);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }   
    }

    async getMeetingsById(req, res){
        try {
            const {id} = req.params;
            const meeting = await meetingService.getMeetingsById(id);
            if (!meeting) {
                return res.status(404).json({ message: 'Meeting not found' });
            }
            res.status(200).json(meeting);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteMeetingById(req, res){
        try {
            const {id} = req.params;
            const result = await meetingService.deleteMeetingById(id);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'Meeting not found') {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    }

    async updateMeetingById(req, res) {
        try {
            const {id} = req.params;
            const updatedMeeting = await meetingService.updateMeetingById(id, req.body);
            res.status(200).json({
                message: 'Meeting updated successfully!',
                meeting: updatedMeeting
            });
        } catch (error) {
            if (error.message === 'Meeting not found') {
                return res.status(404).json({ message: error.message });
            }   
            if (error.message === 'Time slot already booked.') {
                return res.status(400).json({ message: error.message });
            }
            if (error.message === 'Start time must be before end time') {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    }
        
}

module.exports = new MeetingController();