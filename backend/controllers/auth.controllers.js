import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
export const signUp=async(req,res)=>{
    try {
        //sign UP
        //taking input from user
        const {firstName,lastName,userName,email,password}=req.body
        //varifing if already exist in User database
        let existEmail=await User.findOne({email})
        if(existEmail){
            return res.status(400).json({message:"email already exist !"})
        }
        let existUsername=await User.findOne({userName})
        if(existUsername){
            return res.status(400).json({message:"userName already exist !"})
        }
        //password must be of 8 letters
        if(password.length<8){
            return res.status(400).json({message:"password must be at least 8 characters"})
        }
        //encrypting pass with 10 extra characters
        let hassedPassword=await bcrypt.hash(password,10)

        //creating user
        const user=await User.create({
            firstName, //when variable and value same we can write directly
            lastName,
            userName,
            email,
            password:hassedPassword //here variable and value are not same
        })
        //user id is by default provided by mongoose
        let token=await genToken(user._id)

        //storing our token inside cookie
        res.cookie("token",token,{
            httpOnly:true, //for security
            maxAge:7*24*60*60*1000, //till how much ms token is saved in cookie
            sameSite: "strict",
            secure:process.env.NODE_ENVIRONMENT==="production"
        })
        return res.status(201).json(user) //201 success message
        

    } catch(error){
        console.log("🔥 ERROR FULL:", error);
  console.log("🔥 ERROR MESSAGE:", error.message);
  console.log("🔥 STACK:", error.stack);

  return res.status(500).json({
    message: error.message,
  });
        
    }
}
export const login=async(req,res)=>{
    try {
        //login->create a new token for same data
        //provided info
        const {email,password}=req.body
        //varifing if email already exist in User database
        let existuser=await User.findOne({email})
        if(!existuser){
            return res.status(400).json({message:"user not exist !"})
        }
        
        //it decrypt encrypted password and compare
        const isMatch=await bcrypt.compare(password,existuser.password)
        if(!isMatch){
            return res.status(400).json({message:"incorrect password"})
        }
        
        //user id is by default provided by mongoose
        let token=await genToken(existuser._id)

        //storing our token inside cookie
        res.cookie("token",token,{
            httpOnly:true, //for security
            maxAge:7*24*60*60*1000, //till how much ms token is saved in cookie
            sameSite: "strict",
            secure:process.env.NODE_ENVIRONMENT==="production"
        })
        return res.status(201).json(existuser) //201 success message
        

    } catch(error){
        console.log(error);
        return res.status(500).json({message:"login error"})
        
    }
}

//logout
export const logout=async(req,res)=>{
    try {
        //logout->delete token
        res.clearCookie("token")
        return res.status(200).json({message:"logout successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"logout error"})
    }
}