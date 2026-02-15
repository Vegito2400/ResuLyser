const express = require("express");
const router = express.Router();
const { register, login,handleUpload } = require("../controllers/auth.controller");

const multer = require("multer");
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    return cb(null,'./uploads/');
  },
  filename: function(req,file,cb){
    return cb(null,`${Date.now()}-${file.originalname}`);
  },
});
const upload= multer({storage});


router.post("/register", register);
router.post("/login", login);
router.post("/upload",upload.single("resume"),(req,res)=>{
    console.log(req.file);
});


module.exports = router;