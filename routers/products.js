const {Product} = require('../models/product')
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router(); 
const mongoose = require('mongoose')


//fetch product list
router.get('/', async (req, res)=>{
    const productList = await Product.find();
    if(!productList) return  res.status(500).json({success: false})

    res.send(productList);
})

//fetch single product
router.get('/:id', async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(400).send('Product with the given id is not found')

    res.status(200).send(product)
})

//creating a product
router.post('/', async (req, res)=>{
    const { name, description, richDescription, image, brand, price, category, countInStock, rating, numReviews, isFeatured } = req.body;
   //problem in handling wrong category
    const produdctCategory = Category.findById(category)
    if(!produdctCategory) return res.status(400).send('invalid category')

    let product = new Product({ name, description, richDescription, image, brand, price, category, countInStock, rating, numReviews, isFeatured  })

    product = await product.save();
    if(!product) return res.status(500).send('product not created')

    res.status(200).send(product) 
})

//update a product
router.put('/:id', async (req, res) => {
  if(mongoose.isValidObjectId(req.params.id)) return res.status(400).send('Invalid product id')
  const productCategory = await Category.findById(req.body.category);
  if(!productCategory) return res.status(400).send('Invalid Category')

  const { name, description, richDescription, image, brand, price, category, countInStock, rating, numReviews, isFeatured } = req.body;
  const product = await Product.findByIdAndUpdate(req.params.id, { name, description, richDescription, image, brand, price, category, countInStock, rating, numReviews, isFeatured  }, { new: true})
  
  if(!product) return res.status(500).send('the category cannot be updated')
  res.send(product)
})

//delete a product
router.delete('/:id', async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);
    //problem in handlding not found
    if(!product) return res.status(404).send('products is not deleted')

    res.status(200).send(product)


})

module.exports = router;