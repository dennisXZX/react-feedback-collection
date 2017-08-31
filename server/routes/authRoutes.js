const passport = require('passport');

module.exports = (app) => {
	// initiate Google OAuth authentication
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'] // what permissions we ask for
		})
	);

	// handle response from Google after OAuth authentication to get details about a user
	app.get(
		'/auth/google/callback',
		passport.authenticate('google')
	);

	// handle user logout
	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
}

