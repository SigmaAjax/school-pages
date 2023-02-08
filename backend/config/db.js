const mysql = require('mysql');
require('dotenv').config();

const postDb = mysql.createConnection({
	host: process.env.DB_HOST, /// 'localhost'
	user: process.env.DB_USERNAME, ///'root',
	password: process.env.DB_PASSWORD, /// password
	database: process.env.DB_DATABASE_POST,
	port: process.env.DB_PORT,
});

const albumDb = mysql.createConnection({
	host: process.env.DB_HOST, /// 'localhost'
	user: process.env.DB_USERNAME, ///'root',
	password: process.env.DB_PASSWORD, /// password
	database: process.env.DB_DATABASE_ALBUMS,
	port: process.env.DB_PORT,
});

module.exports = {postDb, albumDb};
