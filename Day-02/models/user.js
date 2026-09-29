import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    minlength:2,
    lowercase:true,
    trim:true,
    required:true,
  },
  email:{
    type:String,
    trim:true,
    required:true,
    lowercase:true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password:{
    type:String,
    minlength:8,
    required:true,
    match:/^.{8,}$/
  }
});

const User = mongoose.model("User",userSchema);
export default User;