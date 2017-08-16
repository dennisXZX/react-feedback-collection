const express = require('express');

// generate a running express app
const app = express();

// router handler, watching GET method trying to access '/'
app.get('/', (req, res) => {
	res.send({hi: 'there'});
});

// use Heroku port in production environment or port 5000 in local development environment
const PORT = process.env.PORT || 5000;

// tell Node.js to listen to port 5000
app.listen(PORT);