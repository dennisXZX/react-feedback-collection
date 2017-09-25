const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');

module.exports = (app) => {
	app.post('/api/surveys', requireLogin, requireCredit (req, res) => {

	});
};