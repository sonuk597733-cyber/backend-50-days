import express from 'express';
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.get("/student",(req,res)=>{
  res.json({
    name:"Sonu",
    course:"Diploma in Enginnering",
    age:18
  })
})

export default app;