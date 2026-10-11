import express from 'express';
import connectDB from './db/db.js';
import upload from './middleware/upload.js';
import imagekit from './config/imagekit.js';
import customer from './models/costumer.js';

const app = express();

app.use(express.json());

connectDB();

// GET
app.get('/users', async (req, res) => {
  try {
    const customers = await customer.find();

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch customers',
      error: error.message
    });
  }
});

// POST
app.post('/users', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file || !name) {
      return res.status(400).json({
        message: 'Name and image are required'
      });
    }

    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname
    });

    const newCustomer = await customer.create({
      name,
      image: result.url
    });

    res.status(201).json({
      message: 'Customer created successfully',
      customer: newCustomer
    });
  } catch (error) {
    res.status(500).json({
      message: 'Upload failed',
      error: error.message
    });
  }
});

export default app;