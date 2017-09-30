const _ = require('lodash');
const Path = require('path-parser');
// nodeJS library for parsing URL
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting!');
	});

	app.post('/api/surveys/webhooks', (req, res) => {

		const p = new Path('/api/surveys/:surveyId/:choice');

		// map over the event notification object from SendGrid to extract the info we need
		const events = _.map(req.body, (event) => {
			// extract the pathname from the URL
			const pathname = new URL(event.url).pathname;

			// extract from the path an object {surveyId: simpleSurveyId, choice: 'yes'}
			// return null if the path does not match
			const match = p.test(pathname);

			if (match) {
				return {
					email: event.email,
					surveyId: match.surveyId,
					choice: match.choice
				};
			}
		});

		// remove all 'undefined' elements
		const compactEvents = _.compact(events);
		// remove all duplicated elements
		const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

		// iterate uniqueEvents array and run a MongoDB query on each event
		uniqueEvents.forEach((event) => {
			// find a survey with the specified surveyId
			// and a sub-document collection record with the specified email and responded values
			Survey.updateOne({
				_id: event.surveyId,
				recipients: {
					$elemMatch: { email: event.email, responded: false }
				}
			}, {
				// increment property 'yes' or 'no' by one, using ES6 key interpolation
				$inc: { [event.choice]: 1 },
				// set the 'responded' property of recipients sub-document collection record found by ($elemMatch) to 'true'
				$set: { 'recipients.$.responded': true },
				lastResponded: new Date()
			}).exec(); // doesn't handle the promise as SendGrid doesn't expect a response.
		});

		// send an empty object so the request is not pending
		res.send({});

	}); // END of post('/api/surveys/webhooks')

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

	}); // END of post('/api/surveys')

};