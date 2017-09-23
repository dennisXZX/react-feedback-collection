// import libraries
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

// import keys for development environment
const keys = require('./config/keys');

// create MongoDB users collection
require('./models/User');

// connect to MongoDB
mongoose.connect(keys.mongoURL);

// service to handle authentication
require('./services/passport');

// create a running express app
const app = express();

// enable cookie in Express using cookie-session middleware, which will attach the property 'session' to req. It can be verified in '/api/current_user' route
app.use(
	cookieSession({
		// set cookie expire time to be 30 days in milliseconds
		maxAge: 30 * 24 * 60 * 60 * 1000,
		// keys to encrypt our cookie, can provide multiple keys for better security
		keys: [keys.cookieKey]
	})
);

// middlewares to initialize PassportJS and enable persistent login session
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