import mongoose from 'mongoose'
const customerSchema = new mongoose.Schema({
  image:String,
  name:String
})

const customer = mongoose.model("customer",customerSchema);
export default customer;