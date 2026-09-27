const express = require('express');
const app = express();
app.use(express.json());
const validateProduct = require("./middleware/validateProduct");
const products = [
    { id: 1, name: "iPhone 15", price: 70000, category: "mobile" },
    { id: 2, name: "Samsung S24", price: 65000, category: "mobile" },
    { id: 3, name: "HP Laptop", price: 55000, category: "laptop" },
    { id: 4, name: "Dell Laptop", price: 60000, category: "laptop" },
    { id: 5, name: "Logitech Mouse", price: 1200, category: "accessories" }
];

app.post('/products',validateProduct,(req,res)=>{
  const {name,price,category} = req.body;

   const product = {
        id: products.length + 1,
        name,
        price,
        category
    };
    products.push(product);
    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product
    })
})
module.exports=app;