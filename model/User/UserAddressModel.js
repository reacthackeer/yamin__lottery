
const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');  

const UserAddressModel = sequelize.define('user_address_model',{
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
    country: DataTypes.STRING,
    division: DataTypes.STRING,
    district: DataTypes.STRING,
    addressLineOne: DataTypes.STRING,
    addressLineTwo: DataTypes.STRING,
    addressLineThree: DataTypes.STRING,
    postCode: DataTypes.STRING
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'user_address_model',
    freezeTableName: true
});

module.exports = UserAddressModel;