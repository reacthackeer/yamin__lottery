
const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');  

const UserInfoModel = sequelize.define('user_info_model',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },  
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: DataTypes.STRING,
    verified: {
        type: DataTypes.STRING,
        defaultValue: 'false'
    },
    winner: {
        type: DataTypes.STRING,
        defaultValue: 'false'
    },
    referralCode: {
        type: DataTypes.STRING,
        allowNull: true, 
        unique: false,
        defaultValue: 'empty'
    },
    realBalance: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: false,
        defaultValue: 0
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        unique: false,
        defaultValue: 15
    },
    designation: { 
        type: DataTypes.STRING,
        allowNull: true, 
        unique: false,
        defaultValue: 'user'
    },
    applicationId: { 
        type: DataTypes.STRING, 
        unique: false,
        defaultValue: 'false'
    },
    block: { 
        type: DataTypes.STRING,
        allowNull: true, 
        unique: false,
        defaultValue: 'false'
    }
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'user_info_model',
    freezeTableName: true
});

module.exports = UserInfoModel;