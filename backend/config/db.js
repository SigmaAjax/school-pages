const mysql = require('./backend/mysql');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'NewPostS',
});

module.exports = db;
