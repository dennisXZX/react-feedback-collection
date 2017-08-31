// import libraries
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

// import private data
const keys = require('./config/keys');

// create MongoDB collections
require('./models/User');

// connect to MongoDB
mongoose.connect(keys.mongoURL);

// service to handle authentication
require('./services/passport');

// create a running express app
const app = express();

/*
	middlewares make some pre-processing to the upcoming request then send it to routes 
*/
// enable cookie
app.use(
	cookieSession({
		// set cookie expire time to be 30 days in milliseconds
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

// import routes
const authRoutes = require('./routes/authRoutes');
// execute authentication routes, for simplicity, we can use require('./routes/authRoutes')(app)
authRoutes(app);

// use Heroku port in production environment or port 5000 in local development environment
const PORT = process.env.PORT || 5000;

// tell Node.js to listen to port 5000
app.listen(PORT);