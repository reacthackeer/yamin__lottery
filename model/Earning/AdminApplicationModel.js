
const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');  

const AdminApplicationModel = sequelize.define('admin_application_model',{
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
    tableName: 'admin_application_model',
    freezeTableName: true
});

module.exports = AdminApplicationModel;