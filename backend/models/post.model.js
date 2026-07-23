//making model for post
import mongoose from "mongoose"

const postSchema=new mongoose.Schema({
    author:{// its basically users
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    description:{
    type:String,
    default:""
    },
    image:{
        type:String
    },
    like:[ //it is basically array of users->giving likes
   {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
    }
    ],
    comment:[ //it is array of content and users
    {
        content:{type:String},
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User" 
        }
    }
    ]
},{timestamps:true})

//naming model
const Post=mongoose.model("Post",postSchema)
//exporting model
export default Post