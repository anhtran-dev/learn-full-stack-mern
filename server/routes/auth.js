const express  = require('express');
const router = express.Router();
const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// @router POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
    const {email , password} = req.body;
    // validation
    if(!email || !password){
        return res.status(400).json({success : false , message : 'Email or password is missing !'});
    }
    try{
        // Check for existing user
        const user = await User.findOne({email : email});
        if(user){
            return res.status(400).json({success : false , message : 'Email already !'});
        }
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({
            email : email ,
            password : hashedPassword
        });
        await newUser.save();

        // return token
        const accessToken = jwt.sign({userId : newUser._id} , process.env.ACCESS_TOKEN_SECRET );
        return res.status(200).json({success : true , message : 'Create user success !' , data : newUser , access_token : accessToken})

    }catch (e) {
        return res.status(500).send(e);
    }
});

// @router POST api/auth/login
// @desc Login user
// @access Public

router.post('/login', async (req, res) => {
    const {email , password} = req.body;
    // validation
    if(!email || !password){
        return res.status(400).send({success : false , message : 'Email or password is missing !'});
    }
    try{
        // Check for existing user
        const user = await User.findOne({email});
        if(!user)
            return res.status(400).send({success : false , message : 'Incorrect username or password!'});
        // Email found
        const passwordValid = await argon2.verify(user.password , password);
        if(!passwordValid)
            return res.status(400).send({success : false , message : 'Incorrect username or password!'});

        // Login success
        const accessToken = jwt.sign({userId : user._id} , process.env.ACCESS_TOKEN_SECRET );
        return res.status(200).send({success : true , message : 'Login success !' , data : user , access_token : accessToken});
    }catch (e) {
        return res.status(500).send(e);
    }
});

module.exports = router;
