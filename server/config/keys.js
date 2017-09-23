// figure out what set of credentials to return
// check the env variable provided by Heroku to figure out if we are in production environment
if (process.env.NODE_ENV === 'production') {
	module.exports = require('./prod');
} else {
	module.exports = require('./dev');
}