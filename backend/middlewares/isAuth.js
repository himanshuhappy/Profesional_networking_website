//middleware to verify tokkens
import jwt from "jsonwebtoken"
const isAuth=async(req,res,next)=>{
    //req is like suitcase -> you can add and take data from it
    try {
        let {token}=req.cookies
        if(!token){
            return res.status(400).json({message:"user doesn't have token"})
        }
        let verifytoken=jwt.verify(token,process.env.JWT_SECRET) //jwt.verify in build funct to verify tokens
        if(!verifytoken){
            return res.status(400).json({message:"user doesn't have valid token"})
        }
        req.userId=verifytoken.userId //making of key , verifytoken gives object of data if verified
        next()
        
    } catch (error) {
        return res.status(500).json({message:"is auth error"})
    }
    
}

export default isAuth