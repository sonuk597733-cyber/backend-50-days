import mongoose from "mongoose";
import config  from "./config.js";


async function coonectDB(){
  await mongoose.connect(config.MONGO_URI);
  console.log("connected to DB");
}

export default coonectDB;