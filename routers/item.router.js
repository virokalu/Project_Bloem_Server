const router = require('express').Router();
const ItemController = require('../controller/item.controller');
const cartController = require('../controller/cart.controller');    


router.post('/',ItemController.addItem);
//router.post('/getimg',ImgController.getprofile);
router.get('/',ItemController.findAll);
router.get('/search',ItemController.findSearch);
router.get('/:id',ItemController.findOne);
router.put("/:id",ItemController.update);
//router.delete('/:id',ItemController.delete);
router.post('/regbuyitem',ItemController.regBuyItem);


router.post("/cart",cartController.create);
router.get("/cart/:username",cartController.findAll);
router.delete("/cart",cartController.delete);

module.exports=router;