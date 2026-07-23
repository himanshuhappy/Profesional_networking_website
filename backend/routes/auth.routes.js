import express from "express"
import { logout, signUp } from "../controllers/auth.controllers.js"
import { login } from "../controllers/auth.controllers.js"
let authRouter=express.Router() //all router in authrouter variable
authRouter.post("/signup",signUp) //we call signUp function on adding signup in url
authRouter.post("/login",login)
authRouter.get("/logout",logout)
export default authRouter