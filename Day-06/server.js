import "dotenv/config";
import connectDB from "./config/database.js";
import User from "./public/user.js"
import express from "express";

connectDB();

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/users/api/register",async(req,res)=>{
  const {username,email,password} = req.body;
 
  const user = await User.create({
   username,
   email,
   password
  })
  res.status(201).json({
    success:true,
    message:"Successfully register !"
  })
})

app.get("/users",async(req,res)=>{
try{
  const users = await User.find().select("-password")
  res.status(200).json({
    seccess:true,
    users
  })
}catch(error){
  res.status(500).json({
    success:false,
    message: error.message
  })
}
})
app.get("/users/:id",async(req,res)=>{
 
try{
  const user = await User.findById(req.params.id).select("-password")
  res.status(200).json({
    seccess:true,
    user
  })
}catch(error){
  res.status(500).json({
    success:false,
    message: error.message
  })
}
})

app.listen(process.env.PORT,()=>{
  console.log(`server is running on port no ${process.env.PORT}`)
})