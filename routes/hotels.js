const express = require('express');
const router=express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const {isLoggedIn,isAuthor,validateCampground}=require('../middleware')
//multer, upload images
const multer  = require('multer');
const {storage}=require('../cloudinary/index')// if you dont specify, then node direstly looks for index.js
const upload = multer({ storage })

const hotels=require('../controllers/hotels')

//all functionality in controler
//order matters
router.get('/', catchAsync(hotels.index));

router.get('/new', isLoggedIn, hotels.newForm );

router.post('/', isLoggedIn,upload.array('image'), validateCampground,catchAsync(hotels.PostNewForm))


router.get('/:id', catchAsync(hotels.showCampground))

router.get('/:id/edit',isLoggedIn,isAuthor, catchAsync(hotels.editForm))

router.put('/:id', isLoggedIn, isAuthor,upload.array('image'),validateCampground, catchAsync(hotels.PostEditedForm));

router.delete('/:id',isLoggedIn, isAuthor, catchAsync(hotels.delete));//this also triggers a midlleware in campground.js that deletes the reviews



module.exports=router;