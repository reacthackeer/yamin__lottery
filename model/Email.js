const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');

const Email = sequelize.define('email',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type:  DataTypes.STRING,
        unique: true,
        allowNull: false
    }
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'email',
    freezeTableName: true
});

module.exports = Email;