const {Sequelize} = require('sequelize');

let databasePassword = process.env.ENV__PASS;
let database = process.env.ENV__DB;
let username = process.env.ENV__USER;
let host = process.env.ENV__HOST;

const sequelize = new Sequelize(database, username, databasePassword,{
    host: host,
    dialect: 'mysql',
    logging: false
});


module.exports = sequelize;
