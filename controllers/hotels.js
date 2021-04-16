//we make controlers to make code neater
const Campground = require('../models/campground');
const {cloudinary}=require("../cloudinary")

//mapbo geocodeing
const mbxGeocoding=require("@mapbox/mapbox-sdk/services/geocoding")
const mapBoxToken=process.env.MAPBOX_TOKEN;
const  geocoder=mbxGeocoding({accessToken:mapBoxToken})

module.exports.index=async (req, res) => {
    const hotels = await Campground.find({});
    res.render('hotels/index', { hotels })}


module.exports.newForm=(req, res) => {
   
        res.render('hotels/new');
}

module.exports.PostNewForm=async (req, res, next) => {
   
    const geoData= await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()    //this makes a structure whivh has the given camp  locations coordinates. eg. dubai has , 55.2962, 25.2684


    const campground = new Campground(req.body.campground);
   
    campground.geometry=geoData.body.features[0].geometry;

    campground.images=req.files.map(f =>({url:f.path,filename:f.filename}))//map over array added to req.files by multer
     campground.author=req.user._id;
    await campground.save();
    console.log(campground);
    req.flash('doneSucessfully',"Successfully made a campground!")
    res.redirect(`hotels/${campground._id}`)

}

module.exports.showCampground=async (req, res,) => {
    const campground = await Campground.findById(req.params.id).populate({
        path:"reviews",
        populate:{path:'author' }   //to ptopulate the revoew and then populate the author of each review
            //of the campground
     } ).populate('author');
        //populate the author of capmground
    
   
    if(!campground){
       req.flash('error',"Cannot find that Campground");//if a camp existed and then was deleted
      return res.redirect('/hotels');
   }
   
    res.render('hotels/show', { campground });
}

module.exports.editForm=async (req, res) => {
    const {id}=req.params;

    const campground = await Campground.findById(req.params.id)
   if(!campground){
       req.flash('error','cannot find campground');
       return res.redirect('/hotels')
   }
    res.render('hotels/edit', { campground });
}

module.exports.PostEditedForm=async (req, res) => {
    const { id } = req.params;
    //this is to prevent someone who isint the author from editing
      
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs=req.files.map(f =>({url:f.path,filename:f.filename}))//map over array added to req.files by multer
    campground.images.push(...imgs);
    await campground.save();

    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages)
         cloudinary.uploader.destroy(filename);

         //after deleting image form cloudinary ^ we delete images url from array v
    await campground.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}})
    //from the perticular campground, pull from ITS images array , hte image that has a file name that is there in the deleteImages array. 
    //deleteImages array is made by checkbox in edit page 
    }

    req.flash('doneSucessfully',"Successfully edited your Hotel!")
    res.redirect(`/hotels/${campground._id}`)
}

module.exports.delete=async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('doneSucessfully',"Deleted Hotel")

    res.redirect('/hotels');
    
}