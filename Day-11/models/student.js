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
    bio:{
      type:String,
      required:true,
    },
  })

  const User = mongoose.model("User",userSchema);

export default User;