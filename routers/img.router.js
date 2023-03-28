const router = require('express').Router();
const ImgController = require('../controller/img.controller');



router.post('/img',ImgController.addprofile);
router.post('/getimg',ImgController.getprofile);


module.exports=router;