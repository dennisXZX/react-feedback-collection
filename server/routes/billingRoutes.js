const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {

	/*
	* Stripe Documentation
	* https://stripe.com/docs/api/node#create_charge
	*/

	// any request to this route will go through the requireLogin middleware first to check if the user is logged in or not.
	app.post('/api/stripe', requireLogin, async (req, res) => {
		// create a Stripe charge object
		const charge = await stripe.charges.create({
			amount: 500,
			currency: "usd",
			source: req.body.id,
			description: "$5 for 5 credits"
		});

		// update the user object, PassportJS attaches the logged in user to 'req.user'
		req.user.credits += 5;
		// save the user instance to MongoDB
		const user = await req.user.save();

		// send back the user object when the user record is successfully saved in database
		res.send(user);
	});

};