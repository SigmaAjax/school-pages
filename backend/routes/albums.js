const express = require('express');
const cloudinary = require('../config/cloudinary.js');
const {albumDb} = require('../config/db.js');
const router = express.Router();

/// Album backend ////////////////////////////////

router.post('/upload/album', async (req, res) => {
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

router.post('/upload/album/database', async (req, res) => {
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

router.get('/get/albums', async (req, res) => {
	// get all albums request

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

router.get('/get/album/:id/:titleSlug', async (req, res) => {
	// get one album ...  request choose one row according to slug and id

	const id = req.params.id;
	const slug = req.params.titleSlug;

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

router.put(`/updateAlbum`, async (req, res) => {
	const album = await req.body;
	const {
		arrayOfPictures,
		originalSlug,
		album_id,
		date_updated,
		album_title,
		description,
		...rest
	} = album;
	const slug = album.slug;

	try {
		await albumDb.beginTransaction();

		// Destroy the Cloudinary folder with the old slug
		const response = await cloudinary.api.delete_resources_by_prefix(
			originalSlug
		);

		const folderResponse = await cloudinary.api.delete_folder(originalSlug);

		// Upload the new array of pictures with data_url and with folder named according to the slug
		const promises = arrayOfPictures.map(async (image) => {
			const {data_url, ...rest} = image;
			return await cloudinary.uploader.upload(data_url, {
				public_id: image.name,
				use_filename: true,
				folder: slug,
			});
		});
		const cloudinaryResponse = await Promise.all(promises);

		const arrayOfIDs = await cloudinaryResponse.map((id) => {
			/// get URLs and public id of every image
			return {
				public_id: id.public_id,
				secure_url: id.secure_url,
				url: id.url,
			};
		});

		async function mergeImagesArray() {
			const mutatedImages = await arrayOfPictures.map((image) => {
				// after uploading to the cloudinary server I dont need data encoded as DataURL
				const {data_url, ...rest} = image;
				return rest;
			}); /// copy array of images

			const mergedImages = await mutatedImages.reduce((acc, obj) => {
				let prefix = album.slug + '/'; ///// folder prefix in order to be able to merge the old array of images with the URLs and public_id array from cloudinary
				const match = arrayOfIDs.find(
					(element) => element.public_id.substring(prefix.length) === obj.name
				);
				if (match) acc.push({...obj, ...match});
				return acc;
			}, []);
			return mergedImages;
		}

		const mergedImages = await mergeImagesArray();

		const albumDescription = await new Promise((resolve, reject) => {
			albumDb.query(
				'UPDATE albums SET album_title = ?, slug = ?, description = ?, date_updated = ? WHERE album_id = ?',
				[album_title, slug, description, date_updated, album_id],
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});

		// Delete all photos for the album from album_photos table
		const deletedPhotos = await new Promise((resolve, reject) => {
			albumDb.query(
				'DELETE FROM album_photos WHERE album_id_photos = ?',
				[album_id],
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});

		console.log('Deleted photos from database', deletedPhotos);

		// Update all photos in the MySQL database that have album_id as a foreign key
		const updatePhotoPromises = mergedImages.map(async (image) => {
			const {
				introductionary,
				name,
				last_modified,
				last_modified_date,
				public_id,
				secure_url,
				url,
			} = image;

			const lastModifiedDateISO = last_modified_date.substring(0, 19);

			return new Promise((resolve, reject) => {
				albumDb.query(
					'INSERT INTO album_photos (intro, name, last_modified, last_modified_date, public_id, secure_url, url, album_id_photos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
					[
						introductionary,
						name,
						last_modified,
						lastModifiedDateISO,
						public_id,
						secure_url,
						url,
						album_id,
					],
					(err, result) => {
						if (err) {
							reject(err);
						} else {
							resolve(result);
						}
					}
				);
			});
		});
		const insertPhotosResult = await Promise.all(updatePhotoPromises);

		// Commit the transaction
		await albumDb.commit();

		// Send back to the client response about success
		res.send({success: true, insertPhotosResult});
	} catch (error) {
		console.error(error);
		// Rollback the transaction
		await albumDb.rollback();
		res.status(500).send({error: 'Failed to update the album'});
	} finally {
		// Close the connection
		//albumDb.end();
		console.log('This is the end...');
	}
});

router.delete('/deleteAlbum/:albumIdParam/:albumSlug', async (req, res) => {
	const albumId = req.params.albumIdParam;
	const slugParam = req.params.albumSlug;
	try {
		await albumDb.beginTransaction();

		// Destroy the Cloudinary folder with the old slug
		const resourcesResponse = await cloudinary.api.delete_resources_by_prefix(
			slugParam
		);
		const folderResponse = await cloudinary.api.delete_folder(slugParam);

		// Delete all photos for the album from album_photos table
		const deletedPhotos = await new Promise((resolve, reject) => {
			albumDb.query(
				'DELETE FROM album_photos WHERE album_id_photos = ?',
				[albumId],
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});

		// Delete the album from database

		const deletedAlbums = await new Promise((resolve, reject) => {
			albumDb.query(
				'DELETE FROM albums WHERE album_id = ? ',
				[albumId],
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});
		// Commit the transaction
		await albumDb.commit();

		// Send back to the client response about success
		res.send({
			success: true,
			cloudinary: {resourcesResponse, folderResponse},
			photos_deleted: deletedPhotos,
			album_deleted: deletedAlbums,
		});
	} catch (error) {
		console.error(error);
		// Rollback the transaction
		await albumDb.rollback();
		res.status(500).send({error: 'Failed to update the album'});
	} finally {
		// Close the connection
		//albumDb.end();
		console.log('This is the end...');
	}
});

module.exports = router;
