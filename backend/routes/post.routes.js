import express from "express"
import isAuth from "../middlewares/isAuth.js"
import upload from "../middlewares/multer.js"
import { comment, createPost, like } from "../controllers/post.Controllers.js"
import { getPost } from "../controllers/post.Controllers.js"
const postRouter=express.Router()
//route for creating a post
postRouter.post("/create",isAuth,upload.single("image"),createPost)
//route for posting post
postRouter.get("/getPost",isAuth,getPost)
postRouter.get("/like/:id",isAuth,like)
postRouter.post("/comment/:id",isAuth,comment)
export default postRouter
