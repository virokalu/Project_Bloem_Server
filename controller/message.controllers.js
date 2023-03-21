const Message = require('../model/message.model');

exports.messages = async(req,res)=>{
    const message = new Message({
        sender: req.body.sender,
        reciver: req.body.reciver,
        message: req.body.message,
        timestamp: new Date()
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

