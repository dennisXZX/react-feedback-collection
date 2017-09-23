const passport = require('passport');

module.exports = (app) => {
	// initiate Google OAuth authentication and get a unique code from Google
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'] // what permissions we ask for
		})
	);

	// Passport asks for user details with the code from initialization
	app.get(
		'/auth/google/callback',
		passport.authenticate('google')
	);

	// handle user logout
	app.get('/api/logout', (req, res) => {
		// use logout() method from Passport.js to log user out
		req.logout();
		res.send("You have successfully logged out.");
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};