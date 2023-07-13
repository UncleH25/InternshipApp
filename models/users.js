const mongoose = require('mongoose');

// Define the user schema using Mongoose.Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // First name of the user (required field)
  lastName: { type: String, required: true }, // Last name of the user (required field)
  email: { type: String, required: true }, // Email of the user (required field)
  role: { type: String, required: true }, // Role of the user (required field)
  username: { type: String, required: true, unique: true }, // Username of the user (required and unique field)
  ID: { type: String, required: true, unique: true }, // ID of the user (required and unique field)
});

// Create a model using the user schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
