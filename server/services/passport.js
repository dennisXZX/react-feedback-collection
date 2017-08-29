const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// register Google+ API https://console.developers.google.com
// Google API credentials
const keys = require('../config/keys');

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