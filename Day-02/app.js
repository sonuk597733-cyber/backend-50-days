const http = require('http');
const app = http.createServer((req,res)=>{
  console.log("URL:",req.url);
  console.log("Method:",req.method);
    if(req.url === "/"){
    res.end("Welcome to Home Page");
  }
  else if(req.url === "/about"){
    res.end("This is About Page");
  }
  else if(req.url === "/contact"){
    res.end("This is Contact Page");
  }
  else if(req.url === "/login"){
    res.end("This is Login Page");
  }
  else{
    res.statusCode = 404;
    res.end("Page Not Found");
  }
})
module.exports = app;