// Import the required modules
const express = require('express'); // Express framework for building the API
const mongoose = require('mongoose'); // Mongoose for MongoDB interactions
const { v4: uuidv4 } = require('uuid'); // UUID module for generating unique identifiers

// Create an instance of the Express application
const app = express();
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose
  .connect('mongodb+srv://User1:ABC123!@cluster0.ur0jd7i.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

// Import the User model
const User = require('./models/users');

// Hard-coded data
const users = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'user',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    role: 'admin',
  },
];

// Endpoint: /add-user
app.post('/add-user', (req, res) => {
  const { firstName, lastName, email, role } = req.body;

  // Validate if all fields are populated
  if (!firstName || !lastName || !email || !role) {
    return res.status(400).json({ error: 'All fields must be populated.' });
  }

  // Generate a username based on the first name, last name, and a unique identifier
  const consonants = lastName.replace(/[aeiou]/gi, '').slice(0, 3).padEnd(3, 'x');
  const username = `${firstName.slice(0, 3).toLowerCase()}${consonants}${uuidv4().slice(-3)}`;

  // Create a new User instance
  const user = new User({
    firstName,
    lastName,
    email,
    role,
    username,
    ID: uuidv4(),
  });

  // Save the user to the database
  user
    .save()
    .then((savedUser) => {
      res.status(201).json(savedUser);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to add user.' });
    });
});

// Endpoint: /get-users
app.get('/get-users', (req, res) => {
  // Retrieve all users from the database
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to get users.' });
    });
});

// Endpoint: /get-user/{username}
app.get('/get-user/:username', (req, res) => {
  const { username } = req.params;

  // Find a user by their username
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to get user.' });
    });
});

// Endpoint: /delete-user/{username}
app.delete('/delete-user/:username', (req, res) => {
  const { username } = req.params;

  // Find and delete a user by their username
  User.findOneAndDelete({ username })
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json({ message: 'User deleted successfully.', user: deletedUser });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to delete user.' });
    });
});

// Endpoint: /edit-user
app.patch('/edit-user', (req, res) => {
  const { firstName, lastName, email, role, ID, username } = req.body;

  // Validate if all fields are populated
  if (!firstName || !lastName || !email || !role || !ID || !username) {
    return res.status(400).json({ error: 'All fields must be populated.' });
  }

  // Find a user by their ID and username, and update their details
  User.findOneAndUpdate({ ID, username }, { firstName, lastName, email, role }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json(updatedUser);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to update user.' });
    });
});

app.get("/:universalURL", (req, res) => {
  res.send("404 URL NOT FOUND");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
