
const UserController = require('../controller/user.controller');

const router = require('express').Router();

router.post('/registration',UserController.register);
router.post('/login',UserController.login);

module.exports=router;