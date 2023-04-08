const MessageController = require("../controller/message.controllers");
const UserController = require('../controller/user.controller');
const BarchartController = require('../controller/barchart.controller');

const router = require('express').Router();

router.post('/registration',UserController.register);
router.post('/login',UserController.login);
router.get('/users',UserController.showusers);
router.post('/message',MessageController.messages);//message routes
router.get('/barchartdata',BarchartController.showbarchartData);
router.post('/insertbarchartdata',BarchartController.insertBarChartData);

module.exports=router;