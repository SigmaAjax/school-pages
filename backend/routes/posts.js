const express = require('express');
const {postDb} = require('../config/db.js');
const {response} = require('express');
const router = express.Router();

router.get('/get', (req, res) => {
	// get all posts request
	postDb.query('SELECT * FROM posts', (err, result) => {
		if (err) {
			console.log(err);
		}
		res.send(result);
	});
});

router.get('/get/:id/:titleSlug', (req, res) => {
	// get one post ...  request choose one row according to slug and id

	const id = req.params.id;
	const slug = req.params.titleSlug;

	postDb.query(
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

router.post('/create', (req, res) => {
	const text = req.body.text; //accessing variables from frontend
	const title = req.body.title;
	const userPass = req.body.userPass;
	const date = req.body.date;
	const date_updated = req.body.date; // It is a same because created date is equal to updated date
	const slug = req.body.slug;

	console.table({userPass, title, text, date, slug});

	postDb.query(
		'INSERT INTO posts (title, post_text, user_name, date_posted, date_updated, slug) VALUES (?,?,?,?,?,?)',
		[title, text, userPass, date, date_updated, slug],
		(err, res) => {
			if (err) {
				console.log(err);
			}
			console.log(res);
		}
	);
});

router.put('/updatePost', (req, res) => {
	const id = req.body.id;
	const text = req.body.text;
	const title = req.body.title;
	const userPass = req.body.userPass;
	const slug = req.body.slug;
	const post_updated = req.body.post_updated;

	console.log(req.params.id);

	postDb.query(
		'UPDATE posts SET title=?, post_text=?, user_name=?, date_updated=?, slug=? WHERE id=?',
		[title, text, userPass, post_updated, slug, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

router.delete('/deletePost/:id', (req, res) => {
	const id = req.params.id;
	console.log(id);
	postDb.query('DELETE FROM posts WHERE id = ?', id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

module.exports = router;
