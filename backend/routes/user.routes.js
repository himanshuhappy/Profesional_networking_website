import express from "express"
import { getCurrentUser, updateProfile } from "../controllers/user.controller.js"
import isAuth from "../middlewares/isAuth.js"
//importing multer which saves data to disk mem
import upload from "../middlewares/multer.js"

let userRouter=express.Router() //inbuild funct help in routing
userRouter.get("/currentuser",isAuth,getCurrentUser) //isAuth is middleware wich modifies the req
//route to update profile from frontend
userRouter.put("/updateprofile",isAuth,upload.fields([
    //from frontend
    {name:"profileImage",maxCount:1},
    {name:"coverImage",maxCount:1}
]),updateProfile)
export default userRouter