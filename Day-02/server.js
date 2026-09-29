import "dotenv/config";
import express from "express";
import connectDB from "./config/database.js";
import User from "./models/user.js"
connectDB();
const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/user/auth/register",async(req,res)=>{
  console.log(req.url);
const {username,email,password} = req.body;
if(!username){
  return res.status(400).json({
    success:false,
    message: "Username is required"
  })
}

if(!email){
  return res.status(400).json({
    success:false,
    message: "Email is required"
  })
}

if(!password){
  return res.status(400).json({
    success:false,
    message: "password is required"
  })
}
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