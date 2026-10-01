
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    minlegth:2,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
   match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password:{
    type:String,
    minlegth:8,
    required:true,
    match:/^.{8,}$/
  }
})

const User = mongoose.model("User",userSchema);
export default User;
