const express = require('express');
const db = require('./config/db.js');
const cloudinary = require('./config/cloudinary.js');
const {response} = require('express');
require('dotenv').config();
const port = process.env.NODE_ENV_PORT;

const app = express();

app.use(express.json({limit: '10mb', extended: true}));
app.use(
	express.urlencoded({limit: '10mb', extended: true, parameterLimit: 50000})
);

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
	const date = req.body.date;
	const date_updated = req.body.date; // It is a same because created date is equal to updated date
	const slug = req.body.slug;

	console.table({userPass, title, text, date, slug});

	db.query(
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

app.put('/api/updatePost', (req, res) => {
	const id = req.body.id;
	const text = req.body.text;
	const title = req.body.title;
	const userPass = req.body.userPass;
	const slug = req.body.slug;
	const post_updated = req.body.post_updated;

	console.log(req.params.id);

	db.query(
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

app.delete('/api/deletePost/:id', (req, res) => {
	const id = req.params.id;
	console.log(id);
	db.query('DELETE FROM posts WHERE id = ?', id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

/// Album backend ////////////////////////////////

app.post('/api/upload/album', async (req, res) => {
	/// this cloudinary end-point
	try {
		const {title, images} = req.body;
		console.log(title);
		let promises = [];

		images.map(async (image) => {
			promises.push(
				cloudinary.uploader.upload(image.url, {
					public_id: image.name,
					use_filename: true,
					folder: title,
				})
			);
		});
		const response = await Promise.all(promises);
		res.send(response);
	} catch (err) {
		console.log(err.message);
	}
});

app.post('/api/upload/album/database', async (req, res) => {
	const {album} = req.body;
	console.log(album);
});

app.listen(port, (res, req) => {
	console.log('your port is ', port);
});

// const public_id =
// 	'Výlet do Kamenického Šenova/getAll-data-from-db-and-filter.png';

// cloudinary.uploader.destroy(public_id).then((response) => {
// 	console.log('deleted', response);
// });
