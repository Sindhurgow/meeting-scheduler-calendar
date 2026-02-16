import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../../config/database';
import { IMeeting } from '../interface/meeting.interface';
import User from '../../user/model/user.model'; 

interface MeetingCreationAttributes extends Optional<IMeeting, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

class Meeting extends Model<IMeeting, MeetingCreationAttributes> implements IMeeting {
    declare id: string;
    declare userId: string;
    declare title: string;
    declare startTime: Date;
    declare endTime: Date;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt: Date;
}

Meeting.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Users', 
                key: 'id',
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'Meetings',
        timestamps: true,
        paranoid: true, 
    }
);

User.hasMany(Meeting, { foreignKey: 'userId', as: 'meetings' });
Meeting.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Meeting;