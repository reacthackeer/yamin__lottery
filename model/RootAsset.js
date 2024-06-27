const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');

const RootAsset = sequelize.define('root_asset',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    realBalance: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: true,
        defaultValue: 100000000000
    },
    realCurrentBalance: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: true,
        defaultValue: 100000000000
    },
    investBalance: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: true,
        defaultValue: 100000000000
    },
    investCurrentBalance: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: true,
        defaultValue: 100000000000
    },
    investTotalDeposit: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: true,
        defaultValue: 100000000000
    },
    investTotalWithdrawal: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: true,
        defaultValue: 100000000000
    },
    investTotalProfit: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: true,
        defaultValue: 100000000000
    },
    realTotalCouponDeposit: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: true,
        defaultValue: 0
    },
    realTotalWalletDeposit: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: true,
        defaultValue: 0
    },
    realTotalWalletWithdrawal: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: true,
        defaultValue: 0
    },
    realTotalCommission: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: true,
        defaultValue: 0
    },
    realTotalAppCommission: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: true,
        defaultValue: 0
    },
    realTotalPartnerCommission: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: true,
        defaultValue: 0
    },
    realTotalCouponWithdrawal: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: true,
        defaultValue: 0
    },
    realTotalCommissionWithdrawal: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: true,
        defaultValue: 0
    },
    realTotalAppCommissionWithdrawal: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: true,
        defaultValue: 0
    },
    realTotalPartnerCommissionWithdrawal: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: true,
        defaultValue: 0
    },
    totalLotterySale: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        defaultValue: 0
    }
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'root_asset',
    freezeTableName: true
});

module.exports = RootAsset;