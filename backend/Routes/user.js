const { Router } = require('express');
const jwt = require('jsonwebtoken'); 
const router = Router();
const { User} = require("../db/db");
const {userSignUp, signIn, logout } = require('../Types/types');
const userMiddleware = require('../middlewares/user');
const JWT_SECRET = process.env.JWT_SECRET;



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
    const user = await User.find({
        username : createdPayload.username,
        password : createdPayload.password
    })

    if(user.length != 0){
        const token = jwt.sign({username} , JWT_SECRET)
        const date = new Date();
        const second = date.getSeconds();
        const minutes = date.getMinutes();
        const hour = date.getHours();
        const time = hour + ":" + minutes + ":" + second ;

        await User.updateOne({
            username : createdPayload.username
        },{
            log : [{
                loginTime : time,
                logoutTime : "Still logged-in",
                isActive : true
            }]
        })
        res.json({
            token : token
        })
    }
    else{
        res.status(411).json({
            message : "User not found"
        })
    }
});

router.post('/signup', async (req, res) => {
    const createdPayload = req.body;
    const parsedPayload = userSignUp.safeParse(createdPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg : "false"
        })
        return
    }
    await User.create({
        firstName : createdPayload.firstName,
        lastName : createdPayload.lastName,
        username : createdPayload.username,
        password : createdPayload.password,
        log : [{
            loginTime : "Not logged-in",
            logoutTime : "Not logged-in",
            isActive : false
        }]
    }).then((response)=>{
        res.json({
            msg: 'User created successfully'
        })
    })
});

router.get('/dashboard', userMiddleware  , async(req ,res)=>{
    
    const username = req.username;
    
    const user = await User.find({
        username
    })
    
    res.json({
        msg : user
    })
})

router.put('/logout', userMiddleware , async(req ,res)=>{
    const updatedPayload = req.body;
    const parsedPayload = logout.safeParse(updatedPayload)
    if(!parsedPayload.success){
        res.status(411).json({
            msg : "You sent the wrong inputs"
        })
        return
    }
    const date = new Date();
    const second = date.getSeconds();
    const minutes = date.getMinutes();
    const hour = date.getHours();
    const time = hour + ":" + minutes + ":" + second ;

    await User.updateOne({
        "log._id" : req.body.id
    },{
        "$set": {
          "log.$.logoutTime": time,
          "log.$.isActive": false
        }
    })
    res.json({
        msg : " succesfully logged-out"
    })
})

module.exports = router;
