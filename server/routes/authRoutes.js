const passport = require('passport');

module.exports = (app) => {
	// initiate Google authentication
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
}

