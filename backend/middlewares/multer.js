//this uploads file in local storage
import multer from "multer"
import fs from "fs"
import path from "path"

// ✅ Auto-create the public folder if it doesn't exist
const uploadDir = "./public"
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}
let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public")
    },
    filename:(req,file,cb)=>{
        // ✅ Unique filename to avoid conflicts
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
        cb(null, uniqueName)
    }
})
const upload = multer({storage})

export default upload