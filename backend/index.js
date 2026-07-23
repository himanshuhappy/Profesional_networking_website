import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.routes.js"
import http from "http"
import { Server } from "socket.io"
import connectionRouter from "./routes/connection.routes.js"
dotenv.config() //setup to manage env variable
let app= express()
let server=http.createServer(app) //creating a http server
let port=process.env.PORT || 8000 //get variable from port (fallback 8000)
export const io=new Server(server,{
    cors:({
        origin:"http://localhost:5173", //frontend url
        credentials: true
    })
}) //using for realtime backend and frontend connection using socket.io
app.use(express.json()) //to take data from body
app.use(cookieParser()) // to use cookie parser
app.use(cors({
    origin:"http://localhost:5173", //frontend url
    credentials: true // imp to allow data parsing
}))
app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/api/auth",authRouter) // auth route by callin api/auth
app.use("/api/user",userRouter)
app.use("/api/post",postRouter);
app.use("/api/connection",connectionRouter)
//map for storing socket id
export const userSocketMap=new Map()
//manages realtime connections using socket.io
io.on("connection",(socket)=>{
    console.log("user connected",socket.id)
    //adding values in userSocketMap
    //socket id assigned to user automatically
    socket.on("register",(userId)=>{
        userSocketMap.set(userId,socket.id)
        console.log(userSocketMap)
    })
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
    })
})
server.on('error',(err)=>{
    if(err.code=== 'EADDRINUSE'){
        console.error(`Port ${port} is already in use`)
        process.exit(1)
    }
    console.error('Server error',err)
})

server.listen(port,async()=>{
    await connectDb()
    console.log("server started");
})


