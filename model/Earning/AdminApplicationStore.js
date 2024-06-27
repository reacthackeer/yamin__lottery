
const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');  

const AdminApplicationStoreModel = sequelize.define('admin__application__store__model',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },   
    userId: {
        type: DataTypes.STRING, 
    },     
    phone: {
        type: DataTypes.STRING, 
    },   
    email: {
        type: DataTypes.STRING, 
    },  
    name: DataTypes.STRING, 
    birth: DataTypes.STRING,
    number: DataTypes.STRING,
    link: DataTypes.STRING,
    status: DataTypes.STRING,
    type: DataTypes.STRING
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'admin__application__store__model',
    freezeTableName: true
});

module.exports = AdminApplicationStoreModel;