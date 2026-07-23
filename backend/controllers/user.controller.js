import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
export const getCurrentUser=async(req,res)=>{
    try {
        const user = await User.findById(req.userId).select("-password")
        console.log(user)
        if(!user){
            return res.status(400).json({message:"user does not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"get current user error"})
    }
}
export const updateProfile=async (req,res)=>{
//     console.log("FILES OBJECT:", req.files);
// console.log("PROFILE IMAGE PATH:", req.files?.profileImage?.[0]?.path);
    //console.log("FILES FROM MULTER:", req.files);
    try {
        //get all info from routes
        let {firstName,lastName,userName,headline,location,gender} =req.body
        let skills=req.body.skills?JSON.parse(req.body.skills):[]
        let education=req.body.education?JSON.parse(req.body.education):[]
        let experience=req.body.experience?JSON.parse(req.body.experience):[]
        let profileImage
        let coverImage
        console.log(req.files)
        //getting photos from routes and uploading photos on cloudinary
        if(req.files.profileImage){
            profileImage=await uploadOnCloudinary(req.files.profileImage[0].path)
        }
        if(req.files.coverImage){
        coverImage=await uploadOnCloudinary(req.files.coverImage[0].path)
        }
        //update info on User Model
        let user=await User.findByIdAndUpdate(req.userId,{
            firstName,lastName,userName,headline,location,gender,skills,education,experience,profileImage,coverImage
        },{new:true}).select("-password") //new:true->always take new value, also we do access password
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:`update profile error ${error}`})
    }
}