import { Request, Response } from 'express';
import * as meetingService from '../service/meeting.service';

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { startTime, endTime, title, userId } = req.body;

        if (!startTime || !endTime || !title || !userId) {
             res.status(400).json({ message: "All fields are required" });
             return;
        }

        const start = new Date(startTime);
        const end = new Date(endTime);

        if (start >= end) {
             res.status(400).json({ message: "startTime must be before endTime" });
             return;
        }

        const meeting = await meetingService.createMeeting(req.body);
        res.status(201).json(meeting);

    } catch (error: any) {
        if (error.message === 'This time slot already booked') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};