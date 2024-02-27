const { Router } = require('express');
const jwt = require('jsonwebtoken'); 
const router = Router();
const { Admin , User} = require("../db/db");
const JWT_SECRET = process.env.JWT_SECRET;
const adminMiddleware = require('../middlewares/admin');
const {adminSignUp, signIn } = require('../Types/types');


router.post('/signup', async (req, res) => {

    const createdPayload = req.body;
    console.log(createdPayload);
    const parsedPayload = adminSignUp.safeParse(createdPayload)
    if(!parsedPayload.success){
        res.status(411).json({
            msg : "You sent the wrong inputs"
        })
        return
    }
    await Admin.create({
        firstName : createdPayload.firstName,
        lastName : createdPayload.lastName,
        username : createdPayload.username,
        password : createdPayload.password
    })
    res.json({
        message: 'Admin created successfully'
    })
});


router.post('/signin', async (req, res) => {

    const createdPayload = req.body;
    const parsedPayload = signIn.safeParse(createdPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg : "You sent the wrong inputs"
        })
        return
    }
    const username = createdPayload.username;
    const user = await Admin.find({
        username : createdPayload.username,
        password : createdPayload.password
    })
    if(user.length != 0){
        const token = jwt.sign({username} , JWT_SECRET)
        res.json({
            token: token
        })
    }
    else{
        res.status(411).json({
            message : "Incorrect email or password"
        })
    }
    
});

router.get('/dashboard', adminMiddleware  , async(req ,res)=>{
    const allusers = await User.find({});
    res.json({
        user : allusers
    })
})

module.exports = router;