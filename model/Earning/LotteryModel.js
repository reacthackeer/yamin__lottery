
const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');  

const LotteryModel = sequelize.define('lottery_model',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },   
    userId: {
        type: DataTypes.STRING,
        allowNull: false,  
    },     
    phone: {
        type: DataTypes.STRING,
        allowNull: false,  
    },
    systemLotteryId: DataTypes.STRING,
    lotteryNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: DataTypes.STRING,
    phones: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'empty' 
    },
    multiple: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'false' 
    },  
    status: {
        type: DataTypes.STRING,
        allowNull: true, 
        defaultValue: 'accept'
    }
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'lottery_model',
    freezeTableName: true
});

module.exports = LotteryModel;