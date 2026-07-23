import jwt from "jsonwebtoken"

//generate tokens
const genToken=async(userId)=>{
    try {
        //token will expire in 7 days
        let token=await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
        return token
    } catch (error) {
        console.log(error);
    }
}

export default genToken