

const QuestionService = require('../services/question.service');
const QuestionModel = require("../model/question.model");


exports.updateQuestion = async(req,res,next)=>{
    try{
        const {id,answer} = req.body;

        QuestionModel.findOneAndUpdate(
                {id: id},
                {$set:{answer:answer,answerstatus:true}},
                {new:true},
                (err, data) => {
                    if (err) {
                      res.status(500).send(err.message);
                    } 
                }),
            //const newuser = await UserService.checkuser(newusername);

            res.status(200).json({status:true,sucess:"Answer Added"});

           

    } catch (err){

        throw err;

    }
}
exports.findQuestion = (req,res,next)=>{
    var model = {
        username:req.query.username,
        answerstatus:req.query.answerstatus,
    };

    QuestionService.getQuestion(model,(error,results)=>{
        if(error){
            return res.status(300).json({ status:false});;
        }else{
            return res.status(200).json({ status:true,message: 'Success',data: results });
        }
    })

 }
 exports.addQuestion = async (req,res,next)=>{
    try {
        
        // const {username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus}=req.body;
        // const successRes = await ItemService.insertItem(username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus);

        var model ={
            username:req.body.username,
            question:req.body.question,
            answerstatus:false,
            
        }
        QuestionService.insertQuestion(model,(error,results)=>{
            if(error){
                return next(error);
            }else{
                return res.status(200).json({ status:true,message: 'Question successfully added' });
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:false,message: 'Internal server error' });
        
    }
}

