const router = require('express').Router();
const ItemController = require('../controller/item.controller');



router.post('/',ItemController.additem);
//router.post('/getimg',ImgController.getprofile);


module.exports=router;