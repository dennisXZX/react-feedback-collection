// figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
	module.exports = require('./prod');
} else {
	module.eports = require('./dev');
}