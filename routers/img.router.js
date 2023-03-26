const multer = require('multer');
const router = require('express').Router();
const ImgController = require('../controller/img.controller');




const imgstore = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'img.uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const uploadimg = multer({storage:imgstore})




router.post('/img',uploadimg.single("img"),ImgController.addprofile);
router.post('/getimg',ImgController.getprofile);


module.exports=router;