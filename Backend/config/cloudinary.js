import { v2 as cloudinary } from 'cloudinary';
import pkg from 'multer-storage-cloudinary';
const CloudinaryStorage = pkg.CloudinaryStorage || pkg;
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// multer-storage-cloudinary expects cloudinary.v2.uploader to exist
cloudinary.v2 = cloudinary;

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'FoodDeliveryApp',
    allowedFormats: ['jpeg', 'png', 'jpg'],
  }
});

export { cloudinary, storage };
