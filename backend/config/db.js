const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
	host: process.env.DB_HOST, /// 'localhost'
	user: process.env.DB_USERNAME, ///'root',
	password: process.env.DB_PASSWORD, /// password
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT,
});

module.exports = db;
