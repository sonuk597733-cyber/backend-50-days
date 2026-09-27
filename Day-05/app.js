const express = require("express");

const app = express();

app.use(express.json());

const products = [
    { id: 1, name: "iPhone 15", price: 70000, category: "mobile" },
    { id: 2, name: "Samsung S24", price: 65000, category: "mobile" },
    { id: 3, name: "HP Laptop", price: 55000, category: "laptop" },
    { id: 4, name: "Dell Laptop", price: 60000, category: "laptop" },
    { id: 5, name: "Logitech Mouse", price: 1200, category: "accessories" }
];

// get all product
app.get('/products',(req,res)=>{
  let result = [...products];
  const {category,search,minPrice,maxPrice,sort} = req.query;
  
  //category filter
  if(category){
    result = result.filter(
      (product)=>product.category.toLowerCase() === category.toLowerCase());
  }
  //Search by name
  if(search){
    result = result.filter(
      (product)=>product.name.toLowerCase().includes(search.toLowerCase())
    )
  }
  //min price
  if(minPrice){
    result = result.filter(
      (product)=>product.price >= Number(minPrice)
    )
  }
  //max price
  if(maxPrice){
    result = result.filter(
      (product)=>product.price <= Number(maxPrice)
    )
  }
  //short by price
  if(sort === "low"){
    result.sort((a,b)=> a.price - b.price);
  }
  if(sort === "high"){
    result.sort((a,b)=> b.price - a.price);
  }
  res.status(200).json({
    success:true,
    count:result.length,
    data:result
  })
})
module.exports = app;