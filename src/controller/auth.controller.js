import userModel from "../models/user.model";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export async function register(req,res){
  const {name,email,password} = req.body;
  const isAlreadyRegisterd = await user.userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })
if(isAlreadyRegisterd){
  res.status(400).json({
    message:"Username or email already exists"
  })
}
const  hashedPassword  = crypto.createHash("sha256").update(password).digest("hex");

const user = await userModel.create({
  username,
  email,
  password:hashedPassword
})
}