// upload.js
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Folder name in Cloudinary
    format: async (req, file) => 'jpg', // supports promises as well
    public_id: (req, file) => `${file.originalname.split('.')[0]}${Date.now()}`, // Use the original file name without the extension
    // transformation: [{ flags: 'force_strip', quality: 'auto:low', fetch_format: 'auto', bytes: 100000 }]
  },
});

// Create the multer instance with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;

module.exports.cloudinary = cloudinary;