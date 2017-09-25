// import libraries
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

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

// parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());

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

// import routes, passing Express app as the parameter
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets
	app.use(express.static('client/build'));

	// Express will serve up the index.html if it doesn't recognize a route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// use Heroku port in production environment or port 5000 in local development environment
const PORT = process.env.PORT || 5000;

// tell Node.js to listen to port 5000
app.listen(PORT);