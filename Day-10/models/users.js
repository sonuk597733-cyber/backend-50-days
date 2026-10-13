import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username:String,
  email:String,
  bio: {
    type:String,
    default:''
  }
})
const User = mongoose.model("User",userSchema);
export default User;