import mongoose from "mongoose";

//connect db using mongoose with the help of mongodb_url
const connectDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected")
    }catch(error){
        console.error("db connection error:", error.message || error)
        throw error
    }
}
export default connectDb