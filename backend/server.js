const express = require('../client/node_modules/@types/express');

const port = process.env.REACT_APP_BACKEND_PORT;

const app = express();

app.get('/', (req, res) => {
	res.send('hello world');
});

app.listen(port, (response, request) => {
	console.log('your port is ', port);
});
