const express = require('express');
const router=express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review=require("../models/review");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware")

const reviews=require('../controllers/reviews');
const { reviewSchema } = require('../schemas');
//removed isReviewAuthor
router.delete('/:reviewId', isLoggedIn,catchAsync(reviews.delete))


router.post('/', validateReview,isLoggedIn, catchAsync(reviews.createReview))

module.exports=router;