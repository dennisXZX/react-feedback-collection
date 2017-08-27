const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// register Google+ API https://console.developers.google.com
// Google API credentials
const keys = require('./config/keys');

// generate a running express app
const app = express();

// route handler, watching GET method trying to access '/'
app.get('/', (req, res) => {
	res.send({hi: 'dennis'});
});

// handle OAuth using PassportJS
passport.use(
	// Google authentication
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		}, 
		(accessToken, refreshToken, profile, done) => {
			console.log('accessToken', accessToken);
			console.log('refreshToken', refreshToken);
			console.log('profile', profile);
		}
	)
);

// route handler, watching GET method trying to access '/'
app.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email'] // what permissions we ask for
	})
);

// route handler, watching GET method trying to access '/'
app.get(
	'/auth/google/callback',
	passport.authenticate('google')
);

// use Heroku port in production environment or port 5000 in local development environment
const PORT = process.env.PORT || 5000;

// tell Node.js to listen to port 5000
app.listen(PORT);