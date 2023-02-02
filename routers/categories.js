const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();


//fetch category list
router.get('/', async()=>{
    const categoryList = await Category.find();

    if(!categoryList) res.status(500).json({success: false})
    res.status(200).send(categoryList)

});

//ann error when deleting with wrong id
router.get('/:id', async(req, res) =>{
    const category = await Category.findById(req.params.id);
    console.log(category)
    if(!category) res.status(500).send('Message with the given id was not found')
    
    res.status(200).send(category)
})

//create new category
router.post('/', async(req, res)=>{
    const { name, icon, color} = req.body;
    let category= new Category({ name, icon,color })

    category = await category.save();
    if(!category) res.status(404).send('the category cannot be created!')

    res.send(category);
})  

//update category
router.put('/:id', async(req, res) => {
    const { name, icon, color } = req.body
    const category = await Category.findByIdAndUpdate( req.params.id, { name, icon, color }, { new: true});
    if(!category) return res.status(404).send('the category cannnot be updated')

    res.send(category)
})

//delete category
router.delete('/:id', async (req, res) => {
    const deletedCategory = await Category.findByIdAndRemove(req.params.id);
    if(!deletedCategory) return res.status(404).send('The category was not found')

    res.status(200).send('The category was deleted')
})




module.exports = router;
