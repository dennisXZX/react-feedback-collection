const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {

	app.post('/api/surveys', requireLogin, requireCredit, (req, res) => {
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

		// send an email
		const mailer = new Mailer(survey, surveyTemplate(survey));
		mailer.send();

	});

};