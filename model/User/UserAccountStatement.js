
const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');  

const UserAccountStatementModel = sequelize.define('user_account_statement',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },   
    userId: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true
    },  
    totalUsers: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        defaultValue: 0
    }, 
    totalAdmin: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        defaultValue: 0
    }, 
    totalSeller: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        defaultValue: 0
    }, 
    totalPublisher: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        defaultValue: 0
    }, 
    totalPeddler: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        defaultValue: 0
    }, 
    totalEarning: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true, 
        defaultValue: 0
    }, 
    totalDeposit: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true, 
        defaultValue: 0
    }, 
    totalWithdrawal: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true, 
        defaultValue: 0
    }, 
    totalTransfer: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true, 
        defaultValue: 0
    }, 
    totalLottery: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true, 
        defaultValue: 0
    }, 
    totalWin: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true, 
        defaultValue: 0
    }, 
    totalInvest: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true, 
        defaultValue: 0
    },
    totalInvestPending: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true, 
        defaultValue: 0
    },
    totalInvestProfit: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true, 
        defaultValue: 0
    },
    totalBalance: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true, 
        defaultValue: 0
    },
    totalIn: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true, 
        defaultValue: 0
    },
    totalOut: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true, 
        defaultValue: 0
    },
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'user_account_statement',
    freezeTableName: true
});

module.exports = UserAccountStatementModel;