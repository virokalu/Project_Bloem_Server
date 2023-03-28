const router = require('express').Router();
const ImgController = require('../controller/img.controller');



router.post('/img',ImgController.addprofile);
router.get('/img',ImgController.getprofile);


module.exports=router;