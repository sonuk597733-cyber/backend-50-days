const http = require('http');
const app = http.createServer((req,res)=>{
  console.log("URL:",req.url);
  console.log("Method:",req.method);
  res.end("Request recived Successfully!");
})
module.exports = app;