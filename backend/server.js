const express = require('express');

//const port = process.env.REACT_APP_BACKEND_PORT;
const port = 3200;

const app = express();

app.get('/test', (req, res) => {
	res.send({data: ['dog', 'cat', 'underdog']});
});

app.listen(port, (res, req) => {
	console.log('your port is ', port);
});
