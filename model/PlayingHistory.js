const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');

const PlayingHistory = sequelize.define('playing_history',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    winnerId: {
        type: DataTypes.STRING,  
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,  
        allowNull: true,
        defaultValue: 'Game'
    },
    balanceType: {
        type: DataTypes.STRING,  
        allowNull: true,
        defaultValue: 'demo'
    },
    members: {
        type: DataTypes.STRING,
        allowNull: true
    },  
    playingInfo: {
        type: DataTypes.JSON,
        allowNull: true,    
        defaultValue: []
    },  
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'playing_history',
    freezeTableName: true
});

module.exports = PlayingHistory;
