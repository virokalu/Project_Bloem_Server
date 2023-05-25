const router = require('express').Router();
const QuestionController = require('../controller/question.controller');


router.post('/',QuestionController.addQuestion);
//router.post('/getimg',ImgController.getprofile);
router.get('/',QuestionController.findQuestion);

router.put("/",QuestionController.updateQuestion);
