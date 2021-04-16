const express = require('express');
const router=express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const User=require('../models/user');
const passport = require('passport');

const users=require('../controllers/users');
const user = require('../models/user');

router.get('/register',users.registerForm);

router.post('/register', users.PostRegister);

router.get('/login',users.loginForm);

router.post('/login',passport.authenticate('local',
{failureFlash:true,failureRedirect:'/login'}),users.login)

router.get('/logout',users.logout)


//the error msg is nice cause its from passport.oorg


module.exports=router;