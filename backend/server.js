const express = require('express');
const {albumDb, postDb} = require('./config/db.js');
const cloudinary = require('./config/cloudinary.js');
const {response} = require('express');
require('dotenv').config();
const port = process.env.NODE_ENV_PORT;

const app = express();

app.use(express.json({limit: '10mb', extended: true}));
app.use(
	express.urlencoded({limit: '10mb', extended: true, parameterLimit: 50000})
);

app.get('/api/get', (req, res) => {
	// get all posts request
	postDb.query('SELECT * FROM posts', (err, result) => {
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

app.post('/api/create', (req, res) => {
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

app.put('/api/updatePost', (req, res) => {
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

app.delete('/api/deletePost/:id', (req, res) => {
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
	// database endpoint for storing info about albums
	const {album, photos} = req.body;
	const {title, description, date_created, date_updated, slug} = album;

	//albumDb.connect();

	try {
		// start transaction
		await new Promise((resolve, reject) => {
			albumDb.beginTransaction((err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		// Inserting the data into the album-description table
		const albumDescription = await new Promise((resolve, reject) => {
			albumDb.query(
				'INSERT INTO albums (album_title, description, date_created, date_updated, slug) VALUES (?,?,?,?,?)',
				[title, description, date_created, date_updated, slug],
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});

		const albumId = albumDescription.insertId;
		console.log('Id for every photo as foreign key is...', albumId);

		// Inserting the photos into album one by one

		photos.map(async (image) => {
			const {
				name,
				lastModified,
				lastModifiedDate,
				introductionary,
				public_id,
				secure_url,
				url,
			} = image;

			const lastModifiedDateISO = lastModifiedDate.substring(0, 19);

			await new Promise((resolve, reject) => {
				albumDb.query(
					'INSERT INTO album_photos (intro, name, last_modified, last_modified_date, public_id, secure_url, url, album_id_photos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
					[
						introductionary,
						name,
						lastModified,
						lastModifiedDateISO,
						public_id,
						secure_url,
						url,
						albumId,
					],
					(err) => {
						if (err) {
							reject(err);
						} else {
							resolve();
						}
					}
				);
			});

			console.log('Photo inserted with with album_id as:', albumId);
		});
		// Commit the transaction

		await new Promise((resolve, reject) => {
			albumDb.commit((err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		res.status(201).send({message: 'Data were inserted into both tables'});
	} catch (error) {
		console.log(error.message);
		// Rollback transaction

		await new Promise((resolve) => {
			albumDb.rollback(() => {
				resolve();
			});
		});
		res.status(500).send({message: 'Error in inserting data'});
	} finally {
		//albumDb.end();
		console.log('finished uploading files..');
	}
});

////////////////////////////////////////////////////////////////
/// Getting albums data
////////////////////////////////////////////////////////////////

app.get('/api/get/albums', async (req, res) => {
	// get all albums request

	//albumDb.connect();

	//console.log('connection ... ', albumDb.connect());

	try {
		const albums = await new Promise((resolve, reject) => {
			albumDb.query('SELECT * FROM albums', (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
		//console.log(albums[0].album_title);

		//const album_id = await album.album_id;
		const photos = await Promise.all(
			albums.map(async (album) => {
				return new Promise((resolve, reject) => {
					albumDb.query(
						'SELECT * FROM album_photos WHERE album_id_photos=?',
						album.album_id,
						(error, results) => {
							if (error) {
								reject(error);
							} else {
								resolve({
									album_title: album.album_title,
									album_id: album.album_id,
									description: album.description,
									date_created: album.date_created,
									date_updated: album.date_updated,
									slug: album.slug,
									arrayOfPictures: results,
								});
							}
						}
					);
				});
			})
		);
		res.send(photos);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({message: 'Error fetching data from the database'});
	} finally {
		//albumDb.end();
		console.log('Albums done...');
	}
});

/// get one particular Album from the database

app.get('/api/get/album/:id/:titleSlug', async (req, res) => {
	// get one album ...  request choose one row according to slug and id

	const id = req.params.id;
	const slug = req.params.titleSlug;

	console.table({id, slug});

	try {
		const album = await new Promise((resolve, reject) => {
			albumDb.query(
				'SELECT * FROM albums WHERE album_id=? AND slug=?',
				[id, slug],
				(err, results) => {
					if (err) {
						reject(err);
					} else {
						resolve(results);
					}
				}
			);
		});
		//console.log(albums[0].album_title);

		//const album_id = await album.album_id;
		const photosForDetailAlbum = await Promise.all(
			album.map(async (album) => {
				return new Promise((resolve, reject) => {
					albumDb.query(
						'SELECT * FROM album_photos WHERE album_id_photos=?',
						album.album_id,
						(error, results) => {
							if (error) {
								reject(error);
							} else {
								resolve({
									album_title: album.album_title,
									album_id: album.album_id,
									description: album.description,
									date_created: album.date_created,
									date_updated: album.date_updated,
									slug: album.slug,
									arrayOfPictures: results,
								});
							}
						}
					);
				});
			})
		);
		res.send(photosForDetailAlbum);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({message: 'Error fetching data from the database'});
	} finally {
		//albumDb.end();
		console.log('Albums done...');
	}
});

app.listen(port, (res, req) => {
	console.log('your port is ', port);
});

// const public_id =
// 	'Výlet do Kamenického Šenova/getAll-data-from-db-and-filter.png';

// cloudinary.uploader.destroy(public_id).then((response) => {
// 	console.log('deleted', response);
// });
