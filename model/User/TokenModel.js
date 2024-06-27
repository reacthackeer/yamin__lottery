
const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');  

const TokenModel = sequelize.define('token__model',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },  
    userId: DataTypes.STRING,
    token: DataTypes.TEXT
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'token__model',
    freezeTableName: true
});

module.exports = TokenModel;