const Message = require('../model/message.model');

exports.messages = async(req,res)=>{
    const message = new Message({
        type: req.body.type,
        message : req.body.message,
        sourceName: req.body.sourceName,
        targetName: req.body.targetName,
        time : req.body.time,
    });

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
    collection.find({$or: [{sourceName:req.body.user},{targetName:req.body.user}]}).toArray(function(err,messagesList){
        if(err){
            console.log("failed to retrived message data form mongoDB",err);
        }
        else{
            // const users = chatlist.map(chat => chat.users).flat();
            // const userChats = chatlist.filter(chat => chat.users.includes(req.body.user));
            // const otherChats = chatlist.filter(chat => !chat.users.includes(req.body.user));
            console.log(messagesList.length);
            return res.status(200).json(messagesList);
        }
    });
}

