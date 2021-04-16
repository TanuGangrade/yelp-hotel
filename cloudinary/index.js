const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});

const storage=new CloudinaryStorage({
    cloudinary,
    params:{
    folder:'YelpCamp',//this is the folder in cloudinary in which we store
    allowedFormats:['jpg','png','jpeg']
    }
});

module.exports={
    cloudinary,
    storage
}