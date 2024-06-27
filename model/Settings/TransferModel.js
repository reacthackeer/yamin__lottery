
const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');  

const TransferModel = sequelize.define('transfer_model',{
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
    transferUserId: DataTypes.STRING,
    transferEmail: DataTypes.STRING,
    amount: DataTypes.DECIMAL(20,4), 
    remark: DataTypes.STRING, 
    status: DataTypes.STRING
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'transfer_model',
    freezeTableName: true
});

module.exports = TransferModel;