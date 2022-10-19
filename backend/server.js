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
	// get all posts request
	db.query('SELECT * FROM posts', (err, result) => {
		if (err) {
			console.log(err);
		}
		res.send(result);
	});
});

app.get('/api/get/:id/:titleSlug', (req, res) => {
	// get one post ...  request choose one row according to slug and id

	const id = req.params.id;
	const slug = req.params.titleSlug;

	db.query(
		'SELECT * FROM posts WHERE id=? AND slug=?',
		[id, slug],
		(err, result) => {
			if (err) {
				console.log(err);
			}
			res.send(result);
		}
	);
});

app.post('/api/create', (req, res) => {
	const text = req.body.text; //accessing variables from frontend
	const title = req.body.title;
	const userPass = req.body.userPass;
	const slug = req.body.slug;

	//console.table({userPass, title, text, slug});

	db.query(
		'INSERT INTO posts (title, post_text, user_name, slug) VALUES (?,?,?,?)',
		[title, text, userPass, slug],
		(err, res) => {
			if (err) {
				console.log(err);
			}
			console.log(res);
		}
	);
});

app.put('api/updatePost', (req, res) => {
	const id = req.params.id;
	const text = req.body.text;
	const title = req.body.title;
	const userPass = req.body.userPass;
	const slug = req.body.slug;

	db.query(
		'UPDATE posts SET (title, post_text, user_name, slug) VALUES (?,?,?,?) WHERE id=?',
		[title, text, userPass, slug, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.listen(port, (res, req) => {
	console.log('your port is ', port);
});
