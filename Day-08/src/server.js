import app from './app.js';

import coonectDB from './config/database.js';

coonectDB();

app.listen(3000,()=>{
  console.log("Server start on port no 3000");
})