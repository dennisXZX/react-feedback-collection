const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = (app) => {

	/*
	* Stripe Documentation
	* https://stripe.com/docs/api/node#create_charge
	*/
	app.post('/api/stripe', async (req, res) => {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: "usd",
			source: req.body.id,
			description: "$5 for 5 credits"
		});

		console.log(charge);
	});

};