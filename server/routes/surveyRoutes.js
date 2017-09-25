const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {

	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks for voting!');
	});

	app.post('/api/surveys', requireLogin, requireCredit, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		// create a new survey instance
		const survey = new Survey({
			title,
			subject,
			body,
			// first split the recipients string in an array of string
			// then map over it to get an array of object
			recipients: recipients.split(',').map((email) => {
				return { email: email.trim() }
			}),
			_user: req.user.id,
			dateSent: Date.now()
		});

		// create a Mailer instance, which represents a mail
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			// send emails
			await mailer.send();
			// save the survey to database
			await survey.save();
			// update user credit and save it to database
			req.user.credits -= 1;
			const user = await req.user.save();

			// return the updated user instance
			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}

	}); // END of app.post('/api/surveys')

};