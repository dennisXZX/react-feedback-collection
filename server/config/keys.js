// check the env variable provided by Heroku to return the correct set of credentials
if (process.env.NODE_ENV === 'production') {
	module.exports = require('./prod');
} else {
	module.exports = require('./dev');
}