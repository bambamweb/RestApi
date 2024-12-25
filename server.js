// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // For loading environment variables from .env

// Initialize express app
const app = express();
app.use(express.json()); // Middleware to parse incoming JSON requests

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Define routes

// 1. GET: Return all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users
    res.json(users);
  } catch (err) {
    res.status(500).send('Error retrieving users');
  }
});

// 2. POST: Add a new user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email }); // Create a new user
    await newUser.save(); // Save the user to the database
    res.status(201).json(newUser); // Return the newly created user
  } catch (err) {
    res.status(400).send('Error adding user');
  }
});

// 3. PUT: Edit a user by ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true }); // Update user by ID
    res.json(updatedUser);
  } catch (err) {
    res.status(400).send('Error updating user');
  }
});

// 4. DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id); // Delete the user by ID
    res.status(204).send(); // No content, successful deletion
  } catch (err) {
    res.status(400).send('Error deleting user');
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
