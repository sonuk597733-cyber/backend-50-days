import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import User from "./models/user.js"
connectDB();
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.get("/user",(req,res)=>{
  res.status(200).json({
    message:"Successfully send data"
  })
})
app.post("/user/auth/register",async(req,res)=>{
  console.log(req.url);
  const {username,email,password}= req.body;
  const user = await User.create({
    username,
    email,
    password
  })
  res.status(201).json({
     success: true,
  message: "Registration successful"
  })
})
app.listen(process.env.PORT,()=>{
  console.log("Server is listen on port no 3000")
})