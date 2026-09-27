const express = require('express');
const app = express();
app.use(express.json());
const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mouse", price: 500 },
    { id: 3, name: "Keyboard", price: 1000 }
];

//GET
app.get('/product',(req,res)=>{
    res.json(products);
})
//GET By ID
app.get('/product/:id',(req,res)=>{
    const id = Number(req.params.id);
    const product = products.find((p)=> p.id === id);
    if(!product){
       return  res.status(404).json({
            success:false,
            message:"product not found!"
        })
    }else{
        res.status(200).json({
         success:true,
         message:"Success fully fetch product data",
         data:product
        })
    }
})

// POST
app.post('/product',(req,res)=>{
    const {name,price} = req.body
    const id = products.length + 1;
    const product = {
        id,
        name,
        price
    }
     products.push(product)
        res.status(201).json({
         success:true,
         message:"Success fully add product data",
         data:product
     })
  })

//PUT
app.put('/product/:id',(req,res)=>{
 const id = Number(req.params.id);
 const {name,price} = req.body;
const product = products.find((p)=>p.id === id);
if(!product){
    res.status(404).json({
        success:false,
        message:"NOT update product Data"
    })
}
product.name = name;
product.price = price;
    res.status(200).json({
        success:true,
        message:"Successfully update product Data!",
        product:product,
        Allproduct:products
    })
})

//PATCH
app.patch('/product/:id',(req,res)=>{
 const id = Number(req.params.id);
 const {price} = req.body;
const product = products.find((p)=>p.id === id);
if(!product){
    res.status(404).json({
        success:false,
        message:"NOT update product Data"
    })
}
product.price = price;
    res.status(200).json({
        success:true,
        message:"Successfully update product Data!",
        product:product,
        Allproduct:products
    })
})
//DELETE
app.delete('/product/:id',(req,res)=>{
 const id = Number(req.params.id);
const productIndex = products.findIndex((p)=>p.id === id);
if(productIndex === -1){
        res.status(404).json({
        success:false,
        message:"Product Not Found"
    })
}
products.splice(productIndex,1)
res.status(200).json({
    success:true,
    message:"Successfully Delete product Data!",
    Allproduct:products
    })
})


module.exports = app;