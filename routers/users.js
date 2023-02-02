const {User} = require('../models/user');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken')



//register user
router.post('/', async (req, res) => {
    const { name, email, password, phone, isAdmin, street, apartment, city, zip, country } = req.body;

    let user = new User({ name, email, passwordHash: bcrypt.hashSync(password, 10), phone, isAdmin, street, apartment, city, zip, country });
    user = await user.save();

    if(!user) return res.status(400).send('the category cannot be created!')

    res.send(user)
})

//fetch user
router.get('/:id', async(req, res) =>{
    const user = await User.findById(req.params.id).select('name email phone');
    if(!user) return res.status(500).send('The user with given Id was not found');

    res.status(200).send(user);
})

//fetch list of user
router.get('/', async(req, res)=>{
    const  userList = await User.find().select('-passwordHash');
    if(!userList) return res.status(500).json({success: false});

    res.send(userList)
})


router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    const secret = process.env.secret
   
    if(!user) return res.status(400).send('The user not found');

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            { 
                userId: user.id,
                isAdmin: user.isAdmin
             },
            secret,
            {
                expiresIn: '1d'
            }
        )
        res.status(200).send({ user: user.email, token: token})
    } else {
        res.status(400).send('Password is wrong')
    }

})


module.exports = router;