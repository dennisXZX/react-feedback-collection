const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// service to handle authentication
require('./services/passport');
// import routes
const authRoutes = require('./routes/authRoutes');

// create a running express app
const app = express();

// connect to MongoDB
mongoose.connect(keys.mongoURL);

// execute authentication routes, for simplicity, we can use require('./routes/authRoutes')(app)
authRoutes(app);

// route handler, watching GET method trying to access '/'
app.get('/', (req, res) => {
	res.send({hi: 'dennis'});
});

// use Heroku port in production environment or port 5000 in local development environment
const PORT = process.env.PORT || 5000;

// tell Node.js to listen to port 5000
app.listen(PORT);