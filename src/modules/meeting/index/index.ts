import { Request, Response } from 'express';
import * as meetingService from '../service/meeting.service';

const handleMeetingError = (res: Response, error: any) => {
    const clientErrors = [
        'This time slot already booked',
        'Invalid Time: End time must be strictly after start time'
    ];

    if (clientErrors.includes(error.message)) {
        return res.status(400).json({ message: error.message });
    }
    
    console.error('Error Trace:', error);
    return res.status(500).json({ message: 'Internal server error' });
};

export const createMeeting = async (req: Request, res: Response): Promise<void> => {
    try {
        const meeting = await meetingService.createMeeting(req.body);
        res.status(201).json({ message: 'Meeting booked successfully', meeting });
    } catch (error: any) {
        handleMeetingError(res, error);
    }
};

export const getAllMeetings = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, startDate, endDate } = req.query;
        const meetings = await meetingService.getAllMeetings({
            userId: userId as string,
            startDate: startDate ? new Date(startDate as string) : undefined,
            endDate: endDate ? new Date(endDate as string) : undefined
        });
        res.status(200).json(meetings);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMeetingsByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.userId as string;
        const meetings = await meetingService.getAllMeetings({ userId });
        res.status(200).json(meetings);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMeeting = async (req: Request, res: Response): Promise<void> => {
    try {
        const meetingId = req.params.id as string;
        const meeting = await meetingService.updateMeeting(meetingId, req.body);
        if (!meeting) {
            res.status(404).json({ message: 'Meeting not found' });
            return;
        }
        res.status(200).json({ message: 'Meeting updated successfully', meeting });
    } catch (error: any) {
        handleMeetingError(res, error);
    }
};

export const deleteMeeting = async (req: Request, res: Response): Promise<void> => {
    try {
        const meetingId = req.params.id as string;
        const success = await meetingService.deleteMeeting(meetingId);
        if (!success) {
            res.status(404).json({ message: 'Meeting not found' });
            return;
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};