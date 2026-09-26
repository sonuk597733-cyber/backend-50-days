const http = require("http");
const app = http.createServer((req,res)=>{
  res.end("Hello! this is my backend app.");
})
module.exports = app;