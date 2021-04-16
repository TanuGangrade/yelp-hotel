const Campground = require('../models/campground');
const Review=require("../models/review");



module.exports.createReview=async(req,res)=>{
    const campground= await Campground.findById(req.params.id);// to access the params in app.js we did {mergeParams:true}
    const review=new Review(req.body.review);
    review.author=req.user._id;
    campground.reviews.push(review);
    review.save();
    campground.save();
    req.flash('doneSucessfully',"Created new review!");
    res.redirect("/hotels/"+campground._id);
}

module.exports.delete=async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //pull takes out from our array of reviews, the element w the revireID
    await Review.findByIdAndDelete(reviewId);
    req.flash('doneSucessfully',"Deleted review.");
    res.redirect('/hotels/'+id);
}