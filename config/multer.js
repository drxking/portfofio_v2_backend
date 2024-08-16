const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + ".jpeg")
    }
})

const upload = multer({ storage: storage })





const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadImage = (filePath) => {
    return cloudinary.uploader.upload(filePath, { folder: 'your-folder-name' });
};

uploadImage('path/to/your/image.jpg')
  .then(result => {
    console.log('Image uploaded to Cloudinary:', result.url);
  })
  .catch(error => {
    console.error('Error uploading image:', error);
  });
  


module.exports.upload = upload;