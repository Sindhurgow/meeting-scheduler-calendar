const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('kraftshala_assignment', 'postgres', 'sindhur123',
    {
        host: 'localhost',
        dialect: 'postgres',
        logging: false,
    }
);

module.exports = {sequelize};