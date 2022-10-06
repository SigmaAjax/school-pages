const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password', /// password
	database: 'NewPosts',
	port: '3306',
});

module.exports = db;
