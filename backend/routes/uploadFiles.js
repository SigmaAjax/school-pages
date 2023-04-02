const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

const path = require('path');
const fs = require('fs');
const mime = require('mime');
const documentsDir = path.join(__dirname, '..', 'documents');

// POST
router.post('/upload/files', upload.array('files'), (req, res) => {
	try {
		res.status(200).send('Files uploaded successfully');
	} catch (error) {
		console.error('Error uploading files:', error);
		res.status(500).send('Error uploading files');
	}
});

// GET

router.get('/documents', (req, res) => {
	fs.readdir(documentsDir, (err, filenames) => {
		if (err) {
			console.error('Error reading documents directory:', err);
			res.status(500).json({message: 'Error reading directory'});
		} else {
			const files = filenames.map((filename) => {
				const filePath = path.join(documentsDir, filename);
				const stats = fs.statSync(filePath);
				const mimeType = mime.lookup(filePath);
				const originalName = decodeURIComponent(filename);
				console.log({originalName: originalName});
				return {
					name: originalName,
					size: stats.size,
					type: mimeType,
					path: filePath,
				};
			});
			res.json(files);
		}
	});
});

// Serve the file to the client with the original filename

router.get('/file/:filename', (req, res) => {
	const encodedFilename = req.params.filename;
	const filename = decodeURIComponent(encodedFilename);
	console.log({filename_decoded: filename});
	const fileUrl = `${req.protocol}://${req.get(
		'host'
	)}/files/${encodedFilename}`;
	res.json({name: filename, url: fileUrl});
});

// DELETE

router.delete('/file/:filename', (req, res) => {
	const filename = decodeURIComponent(req.params.filename);
	const filePath = path.join(documentsDir, filename);

	fs.unlink(filePath, (err) => {
		if (err) {
			console.error('Error deleting file:', err);
			res.status(500).send('Error deleting file');
		} else {
			res.status(200).send('File deleted successfully');
		}
	});
});

module.exports = router;