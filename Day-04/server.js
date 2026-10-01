import "dotenv/config";
import connectDB from "./config/database.js";
import User from "./models/user.js";
import express from "express"

connectDB();

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/users",async(req,res)=>{
try{
    const users = await User.find().select("-password");
    res.status(200).json({
        success:true,
        users
    });   
}catch(error){
    res.status(500).json({
        success:false,
        message:error.message
    })
}
});
app.get("/users/:id",async(req,res)=>{
try{
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json({
        success:true,
        user
    });   
}catch(error){
    res.status(500).json({
        success:false,
        message:error.message
    })
}
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});