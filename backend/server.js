const express = require('express');
const db = require('./config/db.js');
//const port = process.env.REACT_APP_BACKEND_PORT;

const app = express();

const port = 3200;

app.get('/test', (req, res) => {
	db.query(
		"INSERT INTO posts (title, post_text, user_name) VALUES ('a title', 'There are concequences killing a god!!!', 'eva ')"
	);
});

app.listen(port, (res, req) => {
	console.log('your port is ', port);
});
