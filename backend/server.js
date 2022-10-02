const express = require('express');

//const port = process.env.REACT_APP_BACKEND_PORT;
const port = 3200;

const app = express();

app.get('/', (req, res) => {
	res.send('hello world');
});

app.listen(port, (response, request) => {
	console.log('your port is ', port);
});
