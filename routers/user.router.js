const MessageController = require("../controller/message.controllers");
const UserController = require('../controller/user.controller');
const BarchartController = require('../controller/barchart.controller');
const ChatListController = require('../controller/chatlist.controller');
const SellerController = require('../controller/selllerdetails.controller');

const router = require('express').Router();

router.post('/registration',UserController.register);
router.post('/login',UserController.login);
router.post('/email',UserController.emailcheck); //CheckEmailForVerification
router.get('/users',UserController.showusers);
router.post('/message',MessageController.messages);//message routes
router.post('/viewmessages',MessageController.displaymessages);
router.get('/barchartdata',BarchartController.showbarchartData);
router.post('/insertbarchartdata',BarchartController.insertBarChartData);
router.post('/chatlistdata',ChatListController.showchatlistData);
router.post('/insertchatlistdata',ChatListController.insertchatlistData);
router.post('/insertcard',UserController.addCard);
router.post('/sellerdetails',SellerController.sellers);
router.put('/updateseller/:username',SellerController.updateseller);

module.exports=router;