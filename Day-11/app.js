
import express from 'express';
import connectDB from './db/db.js';
import User from './models/student.js';

const app = express();

app.use(express.json());

connectDB();

app.get('/api/users', async(req,res)=>{
 const users = await User.find().select('-password');
 res.json(users);
})


export default app;

