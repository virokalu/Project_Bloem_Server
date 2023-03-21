const MessageController = require("../controller/message.controllers");
const UserController = require('../controller/user.controller');

const router = require('express').Router();

router.post('/registration',UserController.register);
router.post('/login',UserController.login);
router.get('/users',UserController.showusers);
router.post('/message',MessageController.messages);//message routes

module.exports=router;