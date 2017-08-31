const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a schema for MongoDB collection
const userSchema = new Schema({
	googleId: String
});

// create a new MongoDB collection
mongoose.model('users', userSchema);