const passport = require('passport');

module.exports = (app) => {
	// initiate Google OAuth authentication and get a unique code from Google
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			// specify what permissions we ask for
			scope: ['profile', 'email']
		})
	);

	// After user grants permission and Google redirects the user back with a code, Passport extracts the Google code from URL and then asks Google for user details we specified with the Google code included. The user details can be accessed from the 'profile' property in GoogleStrategy callback function.
	app.get(
		'/auth/google/callback',
		passport.authenticate('google')
	);

	// handle user logout
	app.get('/api/logout', (req, res) => {
		// use logout() method provided by Passport.js to log user out
		req.logout();
		res.send("You have successfully logged out.");
	});

	// check current login user info
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};