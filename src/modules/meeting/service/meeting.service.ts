import { Op } from 'sequelize';
import Meeting from '../model/meeting.model';
import User from '../../user/model/user.model';
import { CreateMeetingDto, UpdateMeetingDto, MeetingResponseDto } from '../dto/meeting.dto';

const checkConflict = async (userId: string, startTime: Date, endTime: Date, excludeMeetingId?: string): Promise<boolean> => {
    const whereClause: any = {
        userId,
        startTime: { [Op.lt]: endTime },
        endTime: { [Op.gt]: startTime },
    };

    if (excludeMeetingId) {
        whereClause.id = { [Op.ne]: excludeMeetingId };
    }

    const conflictCount = await Meeting.count({ where: whereClause });
    return conflictCount > 0;
};

export const createMeeting = async (data: CreateMeetingDto): Promise<MeetingResponseDto> => {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);

    if (start.getTime() >= end.getTime()) {
        throw new Error('Invalid Time: End time must be strictly after start time');
    }

    const hasConflict = await checkConflict(data.userId, start, end);
    if (hasConflict) {
        throw new Error('This time slot already booked');
    }

    const meeting = await Meeting.create(data as any);
    return meeting.get({ plain: true });
};

export const getAllMeetings = async (filters: { 
    userId?: string; 
    startDate?: Date; 
    endDate?: Date 
}): Promise<MeetingResponseDto[]> => {
    const { userId, startDate, endDate } = filters;
    const whereClause: any = {};

    if (userId) whereClause.userId = userId;

    if (startDate || endDate) {
        whereClause.startTime = {};
        if (startDate) whereClause.startTime[Op.gte] = new Date(startDate);
        if (endDate) whereClause.startTime[Op.lte] = new Date(endDate);
    }

    const meetings = await Meeting.findAll({
        where: whereClause,
        include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }],
        order: [['startTime', 'ASC']] 
    });

    return meetings.map(m => m.get({ plain: true }));
};

export const updateMeeting = async (id: string, data: UpdateMeetingDto): Promise<MeetingResponseDto | null> => {
    const meeting = await Meeting.findByPk(id);
    
    if (!meeting) return null;

    const start = data.startTime ? new Date(data.startTime) : new Date(meeting.startTime);
    const end = data.endTime ? new Date(data.endTime) : new Date(meeting.endTime);

    if (start.getTime() >= end.getTime()) {
        throw new Error('Invalid Time: End time must be strictly after start time');
    }

    if (!meeting.userId) {
        throw new Error('Database Error: Meeting has no associated userId');
    }

    const hasConflict = await checkConflict(meeting.userId, start, end, id);
    if (hasConflict) {
        throw new Error('This time slot already booked');
    }

    await meeting.update(data);
    return meeting.get({ plain: true });
};
export const deleteMeeting = async (id: string): Promise<boolean> => {
    const deletedCount = await Meeting.destroy({ where: { id } });
    return deletedCount > 0;
};