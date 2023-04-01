const express = require('express');
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

// Serve files from the documents directory
const path = require('path');
const documentsDir = path.join(__dirname, 'documents');
console.log(documentsDir); /// output in console is correct "/Users/jj184/Desktop/School-Pages/school-pages/backend/documents"
app.use('/files', express.static(documentsDir));

app.listen(port, (res, req) => {
	console.log('your port is ', port);
});
