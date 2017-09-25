// middleware to check if the user has any credit left
// 'next' is a function that is called when the middleware is complete
module.exports = (req, res, next) => {
	if (req.user.credits < 1) {
		return res.status(403).send({ error: 'Not enough credits!' });
	}

	// if the user has credits in account, move on to the next middleware
	next();
};