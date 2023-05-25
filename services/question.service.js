const QuestionModel = require("../model/question.model");


async function insertQuestion(params,callbacks){
    const Question = new QuestionModel(params);
    Question.save()
    .then((response)=>{
        return callbacks(null,response);
    })
    .catch((error)=>{
        return callbacks(error);
    })
}

async function getQuestion(params,callback){
    const username = params.username;
    const answerstatus = params.answerstatus;
    var condition ={};

    if(username){
        condition["username"] = username;
        
    }
    if(answerstatus){
        condition["answerstatus"] = answerstatus;
    }

    QuestionModel
    .find(condition)
    .then((response)=>{
        return callback(null,response);
    })
    .catch((error)=>{
        return callback(error);
    })

}
module.exports = {
    insertQuestion,
    getQuestion,

};