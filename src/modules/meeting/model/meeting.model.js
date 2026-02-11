const {DataTypes} = require('sequelize');
const {sequelize} = require('../../../config/database');
const User = require('../../user/model/user.model');

const Meeting = sequelize.define('Meeting', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
},{timestamps: true,
    paranoid: true
});

User.hasMany(Meeting, { foreignKey: 'userId', onDelete: 'CASCADE'});

Meeting.belongsTo(User, { foreignKey: 'userId' });

module.exports = Meeting;