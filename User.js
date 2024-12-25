// models/User.js
const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User; // Export the User model
