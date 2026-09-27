const express = require('express')
const app = express();
app.use(express.json());
  app.get('/',(req,res)=>{
 res.send("Home page");
  })
  app.get('/contact',(req,res)=>{
 res.json({message:"Contact page"});
  })
  app.get('/profile',(req,res)=>{
 res.json({message:"Profie page"});
  })
  app.get('/login',(req,res)=>{
 res.json({
  message:"Login page"});
  })
module.exports = app;