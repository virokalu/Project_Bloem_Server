const MessageController = require("../controller/message.controllers");
const UserController = require('../controller/user.controller');
const BarchartController = require('../controller/barchart.controller');
const ChatListController = require('../controller/chatlist.controller');
const SellerController = require('../controller/selllerdetails.controller');

const router = require('express').Router();

const QuestionController = require('../controller/question.controller');


router.post('/question',QuestionController.addQuestion);
router.get('/question',QuestionController.findQuestion);
router.put("/question",QuestionController.updateQuestion);

router.post('/registration',UserController.register);
router.post('/login',UserController.login);
router.post('/email',UserController.emailcheck); //CheckEmailForVerification
router.post('/getEmail',UserController.getemail);

router.post('/password',UserController.updatepassword); //ResetYourPassword
router.post('/update',UserController.update); //ResetYourInfo
router.post('/resetpassword',UserController.resetpassword); //ResetYourPasswordInForget


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