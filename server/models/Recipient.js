const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a recipient schema for MongoDB collection
const recipientSchema = new Schema({
	email: String,
	responded: { type: Boolean, default: false }
});

// export the recipient schema as it is a sub-document
module.exports = recipientSchema;