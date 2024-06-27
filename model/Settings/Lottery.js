
const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');  

const SystemLotteryModel = sequelize.define('system_lottery_model',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },       
    name: DataTypes.STRING,  
    price: DataTypes.DECIMAL(20, 4),  
    lotteryId: {
        type: DataTypes.STRING, 
        unique: true,
        allowNull: false
    },  
    totalSell: DataTypes.INTEGER,  
    amount: DataTypes.DECIMAL(20,4),  
    appCommission: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull:  true,
        defaultValue: 0
    }, 
    userCommission: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull:  true,
        defaultValue: 0
    },
    totalCollection: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull:  true,
        defaultValue: 0
    },
    status:  {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },  
    drawDate:  {
        type: DataTypes.DATE
    },  
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'system_lottery_model',
    freezeTableName: true
});

module.exports = SystemLotteryModel;