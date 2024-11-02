import multer from 'multer';
import path from "path";

// const storage = multer.memoryStorage();
// export const singleUpload = multer({storage}).single("file");

// const upload = multer({dest: "../uploads"});
// export const singleUpload = upload.single("file");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/uploads')
    },
    filename: function (req, file, cb) {
        const extName = path.extname(file.originalname).toString();
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + extName)
    }
});
  
export const singleUpload = multer({ storage: storage })
// export const singleUpload = upload.single("file");
