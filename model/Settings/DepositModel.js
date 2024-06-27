
const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');  

const DepositModel = sequelize.define('deposit_model',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },   
    userId: {
        type: DataTypes.STRING,
        allowNull: false,  
        unique: true,
    },     
    phone: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true
    },   
    email: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true
    },
    wallet: DataTypes.STRING,
    walletUserId: DataTypes.STRING,
    walletEmail: DataTypes.STRING,
    amount: DataTypes.DECIMAL(20,4),
    transactionId: DataTypes.STRING,
    remark: DataTypes.STRING,
    date: DataTypes.STRING,
    time: DataTypes.STRING,
    status: DataTypes.STRING
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'deposit_model',
    freezeTableName: true
});

module.exports = DepositModel;