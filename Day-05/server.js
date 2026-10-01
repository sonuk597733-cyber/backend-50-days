import "dotenv/config"
import connectDB from "./config/database.js";
import User from "./models/usermodel.js";
import express from "express";
connectDB();
const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/user/api/register",async(req,res)=>{
    const {username,email,password} = req.body;
 await User.create({
    username,
    email,
    password
 })
 res.status(201).json({
    success:true,
    message:"Registation Successful !"
 })
})
app.post("/user/api/register",async(req,res)=>{
    const {username,email,password} = req.body;
 await User.create({
    username,
    email,
    password
 })
 res.status(201).json({
    success:true,
    message:"Registation Successful !"
 })
})
app.listen(process.env.PORT,()=>{
    console.log(`server is running on poryt no ${process.env.PORT}`)
})