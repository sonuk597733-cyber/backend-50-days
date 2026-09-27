const express = require('express');
const validateProduct = require("./middleware/validateProduct");
const app = express();
app.use(express.json());

module.exports=app;
