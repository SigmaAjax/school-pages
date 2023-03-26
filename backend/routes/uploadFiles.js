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
				return {
					name: filename,
					size: stats.size,
					type: mimeType,
				};
			});
			res.json(files);
		}
	});
});

module.exports = router;
