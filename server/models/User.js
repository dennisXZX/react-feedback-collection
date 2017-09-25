const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a user schema for MongoDB collection
const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 }
});

// create a new MongoDB collection named 'users'
mongoose.model('users', userSchema);