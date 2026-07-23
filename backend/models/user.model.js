import mongoose from "mongoose";


// all the properties of user
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required: true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:""
    },
    coverImage:{
        type:String,
        default:""
    },
    headline:{
        type:String,
        default:""
    },
    //when you have more than one skill
    skills:[{type:String}],
    education:[
        //multiple objects
        {
            college:{type:String},
            degree:{type:String},
            fieldOfStudy:{type:String}
        }
    ],
    location:{
        type:String,
        default:"India"
    },
    gender:{
        type:String,
        enum:["male","female","other"]
    },
    experience:[
        {
            title:{type:String},
            company:{type:String},
            description:{type:String}
        }
    ],
    connection:[{
        //it takes other object schemas
        type:mongoose.Schema.Types.ObjectId,
        //from which database it takes it
        ref: "User"
    }
    ]

},{timestamps:true})

//making user model
const User=mongoose.model("User",userSchema)
export default User