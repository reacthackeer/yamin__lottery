const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');

const Prize = sequelize.define('prize',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(20,4),
        allowNull: false,  
        defaultValue: 0
    }, 
    name: {
        type: DataTypes.STRING(20,4),
        allowNull: false,  
        defaultValue: 'false'
    }, 
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'prize',
    freezeTableName: true
});

module.exports = Prize;