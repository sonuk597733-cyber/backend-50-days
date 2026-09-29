import app from '../src/app.js';

import coonectDB from '../src/config/database.js';

coonectDB();

app.listen(3000,()=>{
  console.log("Server start on port no 3000");
})