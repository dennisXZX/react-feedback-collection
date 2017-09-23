const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a schema for MongoDB collection
const userSchema = new Schema({
	googleId: String
});

// create a new MongoDB collection named 'users'
mongoose.model('users', userSchema);