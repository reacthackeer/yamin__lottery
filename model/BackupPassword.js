const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');
const BackupPassword = sequelize.define('backup_password',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique:  true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'backup_password',
    freezeTableName: true
});

module.exports = BackupPassword;