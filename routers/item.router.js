const router = require('express').Router();
const ItemController = require('../controller/item.controller');



router.post('/',ItemController.addItem);
//router.post('/getimg',ImgController.getprofile);
router.get('/',ItemController.findAll);
router.get('/:id',ItemController.findOne);
router.put("/:id",ItemController.update);
router.delete('/:id',ItemController.delete);
router.post('/regbuyitem',ItemController.regBuyItem);


module.exports=router;