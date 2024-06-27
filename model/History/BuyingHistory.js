
const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');  

const BuyingHistory = sequelize.define('buying_history',{
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
    tableName: 'buying_history',
    freezeTableName: true
});

module.exports = BuyingHistory;