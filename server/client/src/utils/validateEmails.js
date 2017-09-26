// Javascript regular expression from http://emailregex.com/
const jsReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

/*
* Returns an error message containing the invalid emails
* @returns {string}
*/
// TODO deal with the trailing comma
export default (emails) => {
	const invalidEmails = emails
		// split the strings into an array
		.split(',')
		// get rid of all spaces
		.map((email) => email.trim())
		// use regex to get all invalid emails
		.filter((email) => jsReg.test(email) === false);

	// return an error message if the invalidEmails array contains any email
	if (invalidEmails.length) {
		return `These emails are invalid: ${invalidEmails}`;
	}
}