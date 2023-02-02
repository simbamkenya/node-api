const {Order} = require('../models/order');
const express = require('express');
const { Category } = require('../models/category');
const { OrderItem } = require('../models/Order-item')
const router = express.Router();


router.get('/', async(req, res)=>{
    const orderList = await Order.find();

    if(!orderList){
        res.status(500).json({success: false})
    }

    res.send(orderList);
    
})

router.post('/', async (req, res) => {
    const { orderItems, shippingAddress1, shippingAddress2, city, zip, country, phone, status, totalPrice, user} = req.body;
    const orderItemsIds = orderItems.map(orderItem => {

    })
    let order = new Order({ orderItems: orderItemsIds, shippingAddress1, shippingAddress2, city, zip, country, phone, status, totalPrice, user });
    order = await order.save();

    if(!order) return res.status(400).send()
})


module.exports = router;



// {
//     "orderItems" : [
//         {
//             "quantity": 3,
//             "product" : "63b08bd0a0ed33be16d8cceb",
//         },
//         {
//             "quantity": 8,
//             "product" : "639c3804c2c174f40d152050",
//         },
//     ]
//     "ShippingAddress1": "FLower street, 45",
//     "ShippingAddress2": "1-b"
//     "city": "prague",
//     "zip": "00000",
//     "country": "Czech",
//     "phone": "0753058723054",
//     "user": "63bbf87ec7e9c31c2d080663"
// }