
const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');  

const LotteryHistoryModel = sequelize.define('lottery_history_model',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },   
    userId: {
        type: DataTypes.STRING,
        allowNull: false,  
    },   
    email: {
        type: DataTypes.STRING,
        allowNull: false,  
    },  
    lotteryNumber: {
        type: DataTypes.STRING,
        allowNull: false,  
        unique: true
    },    
    phone: {
        type: DataTypes.STRING,
        allowNull: false,  
    },
    amount: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: false,  
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    type: DataTypes.STRING,
    status: DataTypes.STRING
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'lottery_history_model',
    freezeTableName: true
});

module.exports = LotteryHistoryModel;