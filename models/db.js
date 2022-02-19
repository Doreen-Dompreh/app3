const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');
//create a connection to your database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// open mysql createConnection
connection.connect(error=>{
    if(error) throw error;
    console.log('Successfully connected to the dtabase');
});

module.exports = connection;