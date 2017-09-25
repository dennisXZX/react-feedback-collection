const mongoose = require('mongoose');
const { Schema } = mongoose;

// import a sub-document
const RecipientSchema = require('./Recipient');

// create a survey schema for MongoDB collection
const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	// recipients contains an array of objects that obey recipientSchema
	recipients: [RecipientSchema],
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	// it is a convention to set up a relationship field with a prefix '_'
	_user: { type: Schema.Types.ObjectId, ref: 'User'},
	dateSent: Date,
	lastResponded: Date
});

// create a new MongoDB collection named 'surveys'
mongoose.model('surveys', surveySchema);