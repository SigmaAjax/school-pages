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

module.exports = router;
