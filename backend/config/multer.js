const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'documents/');
	},
	filename: (req, file, cb) => {
		const fileExtension = path.extname(file.originalname);
		const fileNameWithoutExtension = path.basename(
			file.originalname,
			fileExtension
		);
		const timestamp = Date.now();
		const newFileName = `${fileNameWithoutExtension}-${timestamp}${fileExtension}`;
		cb(null, newFileName);
	},
});

const upload = multer({storage});

module.exports = upload;
