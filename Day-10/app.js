
import express from 'express';
import connectDB from './db/db.js';
import User from './models/users.js';

const app = express();

app.use(express.json());

connectDB();

// GET: All profiles
app.get('/api/profile', async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: 'Profiles fetched successfully',
      users
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch profiles',
      error: error.message
    });
  }
});

// POST: Create profile
app.post('/api/profile', async (req, res) => {
  try {
    const { username, email, bio } = req.body;

    const user = await User.create({
      username,
      email,
      bio
    });

    res.status(201).json({
      message: 'Profile created successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create profile',
      error: error.message
    });
  }
});

// PUT: Update profile
app.put('/api/profile/:id', async (req, res) => {
  try {
    const { username, email, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, bio },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update profile',
      error: error.message
    });
  }
});

// DELETE: Remove profile
app.delete('/api/profile/:id', async (req, res) => {
    console.log('DELETE ROUTE HIT:', req.params.id);
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      message: 'Profile deleted successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete profile',
      error: error.message
    });
  }
});

export default app;
