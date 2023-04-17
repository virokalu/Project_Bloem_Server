const Message = require('../model/message.model');

exports.messages = async(req,res)=>{
    const message = new Message({
        type: req.body.type,
        message : req.body.message,
        sourceId: req.body.sourceId,
        targetId: req.body.targetId,
        key: req.body.key,
    })

    message.save((err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
    });
    
}

exports.displaymessages = async(req,res)=> {
  const db = require("../config/db");
    const collection = db.collection('messages');
    collection.find({}).toArray(function(err,messagesList){
        if(err){
            console.log("failed to retrived message data form mongoDB",err);
        }
        else{
            // const users = chatlist.map(chat => chat.users).flat();
            // const userChats = chatlist.filter(chat => chat.users.includes(req.body.user));
            // const otherChats = chatlist.filter(chat => !chat.users.includes(req.body.user));
            console.log(messagesList);
            return res.status(200).json(messagesList);
        }
    });
}

