const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');
const WithdrawalRequest = sequelize.define('withdrawal_request',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    wallet: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idType: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    account: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    currency: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Usd'
    },
    amount: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: false, 
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true, 
        defaultValue: "pending"
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'empty'
    }
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'withdrawal_request',
    freezeTableName: true
});

module.exports = WithdrawalRequest;