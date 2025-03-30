import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (localfilePath) => {
   try {
    if(!localfilePath) return;
     const uploadedRes= await cloudinary.uploader.upload(localfilePath, {
         resource_type: "auto",
         folder: "letsnote"
     })

    
     return uploadedRes
   } catch (error) {
   throw new Error("Cloudinary upload error:", error)
  
    return null;
   }
  finally{
    fs.unlink(localfilePath, (err) => {
        if (err) {
          throw err
        }})
  }
}

export default uploadImage