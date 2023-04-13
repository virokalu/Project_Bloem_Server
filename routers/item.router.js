const router = require('express').Router();
const ItemController = require('../controller/item.controller');



router.post('/',ItemController.addItem);
//router.post('/getimg',ImgController.getprofile);
router.get('/',ItemController.findAll);
router.get('/:id',ItemController.findOne);
router.put('/',ItemController.update);
router.delete('/',ItemController.delete);


module.exports=router;