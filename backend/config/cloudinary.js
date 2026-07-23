//used for image uploading
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs" // for file delete
const uploadOnCloudinary=async(filePath)=>{ //FILE PATH as input req
    //console.log("Attempting to upload file from:", filePath);
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME , 
        api_key:process.env.CLOUDINARY_API_KEY , 
        api_secret:process.env.CLOUDINARY_API_SECRET 
    });
    try {
        if(!filePath){
            return null
        }
        const uploadResult = await cloudinary.uploader.upload(filePath) //upload filepath in cloudinary
        fs.unlinkSync(filePath) //delete file path
        return uploadResult.secure_url //give url of cloudinary uploaded file
    } catch (error) {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
        console.log(error);
    }
}

export default uploadOnCloudinary