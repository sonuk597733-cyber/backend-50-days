import mongoose from "mongoose";
  const userSchema = new mongoose.Schema({
    username:{
      type:String,
      required:true,
      minlength:3,
      trim:true,
      lowercase:true
    },
    email:{
      type:String,
      required:true,
      trim:true,
      lowercase:true,
      match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password:{
      type:String,
      required:true,
      minlength:8,
      match:/^.{8,}$/
    },
  })

  const User = mongoose.model("User",userSchema);

export default User;