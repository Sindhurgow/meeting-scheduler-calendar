const Meeting = require('../model/meeting.model');
const User = require('../../user/model/user.model');
const {Op} = require('sequelize');

const createMeeting = async (data) => {
    const {title, startTime, endTime, userId} = data;

    if (new Date(startTime) >= new Date(endTime)) {
        throw new Error('Start time must be before end time');
    }

    const overlappingMeeting = await Meeting.findOne({
        where: {
            userId,
            [Op.or]: [
                {
                    startTime: {
                        [Op.lt]: endTime,
                    },
                    endTime: {
                        [Op.gt]: startTime,
                    },
                },
            ],
        },
    });

    if (overlappingMeeting) {
        throw new Error('Time slot already booked');
    }

    const meeting = await Meeting.create({
        title,
        startTime,
        endTime,
        userId,
    });

    return meeting;
};

const getMeetingsByUserId = async (userId) => {
    const meetings = await Meeting.findAll({
        where: {userId},
        order: [['startTime', 'ASC']],
    });
    return meetings;
};

const getAllMeetings = async () => {
    const meetings = await Meeting.findAll({
            include: [{
                model: User,
                attributes: ['name', 'email'],
            }], 
    });
    return meetings;
};

const getMeetingsById = async (id) => {
    return await Meeting.findByPk(id);
}

const deleteMeetingById = async (id) => {
    const meeting = await Meeting.findByPk(id);
    if (!meeting) {
        throw new Error('Meeting not found');
    }
    await meeting.destroy();
    return { message: 'Meeting deleted successfully' };
}

const updateMeetingById = async (id, data) => {
    const {title, startTime, endTime, userId} = data;
    const meeting = await Meeting.findByPk(id);

    if (!meeting) {
        throw new Error('Meeting not found');
    }
    
    if (startTime && endTime) {
        if (new Date(startTime) >= new Date(endTime)) {
            throw new Error('Start time must be before end time');
        }
        const conflict = await Meeting.findOne({
            where: {
                id: { [Op.ne]: id }, 
                startTime: { [Op.lt]: endTime },
                endTime: { [Op.gt]: startTime }
            }
        });

        if (conflict) {
            throw new Error('Time slot already booked');
        }
    }
    await meeting.update({title, startTime, endTime, userId});
    return meeting;
}

module.exports = {
    createMeeting,
    getMeetingsByUserId,
    getAllMeetings,
    getMeetingsById,
    deleteMeetingById,
    updateMeetingById,
};