const express = require("express");
const router = express.Router();
const { register, login, getProfile } = require("../controllers/auth.controller");
const User = require("../models/userschema.js");
const authMiddleware = require("../middleware/auth");

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

router.get('/login', authMiddleware, getProfile);

module.exports = router;