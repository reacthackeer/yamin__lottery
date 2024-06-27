
const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');  

const InvestSystemModel = sequelize.define('invest_system_model',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },   
    userId: DataTypes.STRING,
    profit: DataTypes.DECIMAL(20,4),
    duration: DataTypes.STRING, 
    amount: DataTypes.DECIMAL(20,4),  
    status: DataTypes.STRING
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'invest_system_model',
    freezeTableName: true
});

module.exports = InvestSystemModel;