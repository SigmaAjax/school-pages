const express = require('express');
// const {albumDb, postDb} = require('./config/db.js');
// const cloudinary = require('./config/cloudinary.js');
// const {response} = require('express');
require('dotenv').config();
const port = process.env.NODE_ENV_PORT;

const app = express();

app.use(express.json({limit: '10mb', extended: true}));
app.use(
	express.urlencoded({limit: '10mb', extended: true, parameterLimit: 50000})
);

// Import routers
const postsRouter = require('./routes/posts');
const albumsRouter = require('./routes/albums');
const uploadFilesRouter = require('./routes/uploadFiles');

// Use routers
app.use('/api', postsRouter);
app.use('/api', albumsRouter);
app.use('/api', uploadFilesRouter);

///
// uploadFiles.js code here

app.listen(port, (res, req) => {
	console.log('your port is ', port);
});
