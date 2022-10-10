const express = require('express');
const db = require('./config/db.js');
//const port = process.env.REACT_APP_BACKEND_PORT;

const app = express();

const port = 3200;

app.use(express.json());

// app.get('/test', (req, res) => {
// 	db.query(
// 		"INSERT INTO posts (title, post_text, user_name) VALUES ('a title', 'There are concequences killing a god!!!', 'eva')"
// 	);
// });

app.get('/api/get', (req, res) => {
	db.query('SELECT * FROM posts', (err, result) => {
		if (err) {
			console.log(err);
		}
		res.send(result);
	});
});

app.post('/api/create', (req, res) => {
	const text = req.body.text; //accessing variables from frontend
	const title = req.body.title;
	const userPass = req.body.userPass;

	//console.table({userPass, title, text});

	db.query(
		'INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)',
		[title, text, userPass],
		(err, res) => {
			if (err) {
				console.log(err);
			}
			console.log(res);
		}
	);
});

app.listen(port, (res, req) => {
	console.log('your port is ', port);
});
