const chatlist = require('../model/chatlist.model');
const chatModel = require('../model/chatlist.model');
require('dotenv').config();

exports.showchatlistData = async(req,res)=>{

    const db = require("../config/db");
    const collection = db.collection('chatlists');
    collection.find({}).toArray(function(err,chatlist){
        if(err){
            console.log("failed to retrived chatlist data form mongoDB",err);
        }
        else{
            const users = chatlist.map(chat => chat.users).flat();
            const userChats = chatlist.filter(chat => chat.users.includes(req.body.user));
            const otherChats = chatlist.filter(chat => !chat.users.includes(req.body.user));
            console.log(userChats);
            return res.status(200).json(userChats);
        }
    });
}

exports.insertchatlistData = async(req, res) => {
    const Chatlist = new chatlist({
        name: req.body.name,
        currentpage: req.body.currentpage,
        users: req.body.users,
        img: req.body.img,
        id: req.body.id
    })

    Chatlist.save((err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
    });
}