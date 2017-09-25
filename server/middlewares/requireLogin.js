// middleware to check if the user is logged in
// 'next' is a function that is called when the middleware is complete
module.exports = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ error: 'You must log in first!' });
	}

	// if the user has already logged in, move on to the next middleware
	next();
};