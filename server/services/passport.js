const passport = require('passport');
// Google authentication strategy for PassportJS
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
		// execute this verify callback when user profile is returned
		(accessToken, refreshToken, profile, done) => {
			console.log('Welcome ' + profile.name.givenName);
		}
	)
);