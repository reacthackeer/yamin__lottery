const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');

const ConnectedList = sequelize.define('connected_list',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    socketId: {
        type: DataTypes.STRING,
        allowNull: false,   
        unique: true
    }, 
    userId: {
        type: DataTypes.STRING,
        allowNull: false,   
        unique: true
    }, 
    roomId: {
        type: DataTypes.STRING,
        allowNull: true,   
        defaultValue: 'false'
    }, 
    inRoom: {
        type: DataTypes.STRING,
        allowNull: true,   
        defaultValue: 'false'
    }, 
    interested: {
        type: DataTypes.STRING,
        allowNull: true,   
        defaultValue: 'false'
    }, 
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'connected_list',
    freezeTableName: true
});

module.exports = ConnectedList;