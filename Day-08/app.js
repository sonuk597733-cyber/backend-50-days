import express from 'express';
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.get("/students/:name/:age/:course",(req,res)=>{
  console.log(req.url);
  const {name,age,course} = req.params;
  res.json({
 message: `Welcome ${name}, Age: ${age}, Course: ${course}`
  })
})
export default app;