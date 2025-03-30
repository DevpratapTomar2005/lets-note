
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const uploadImgPath = path.join(__dirname,'..' , 'uploads');




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     return cb(null, uploadImgPath)
    },
    filename: function (req, file, cb) {
     
    return  cb(null, `${req.user._id +'-'+new Date().getMilliseconds()+'-'+file.fieldname+path.extname(file.originalname)}`)
    
    }
  })
  const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true); 
    } else {
      cb(new Error('Only images can be uploaded!'), false); 
    }
  }
  const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
  })



 export default upload