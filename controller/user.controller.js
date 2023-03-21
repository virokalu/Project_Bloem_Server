const UserService = require('../services/user.services');
const UserModel = require('../model/user.model');
require('dotenv').config();

exports.register = async(req,res,next)=>{
    try{
        const {username,fullname,email,password} = req.body;

        const user = await UserService.checkuser(username);
        const emailcheck = await UserService.checkemail(email);

        if(!user && !emailcheck){
            const successRes = await UserService.registerUser(username,fullname,email,password);
            res.status(200).json({status:true,sucess:"User Registered Successfully"});
            //console.log("User Registered Successfully");
        }else if(emailcheck){
            res.status(200).json({status:false,exist:"email",sucess:"User Not Registered"});
            //console.log("User Not Registered email");
        }else if(user){
            res.status(200).json({status:false,exist:"user",sucess:"User Not Registered"});
            //console.log("User Not Registered username");

        }   

    } catch (err){

        throw err;

    }
}
exports.login = async(req,res,next)=>{
    
        const { username, password } = req.body;
    try {
        const user = await UserService.checkuser(username);
        //console.log(user);
        if (!user) {
            return res.status(200).json({status:false});
        }
        const isMatch = await user.comparePassword(password);

            if(isMatch==true){
                let tokenData = {_id:user._id,username:user.username};

                const token = await UserService.generateToken(tokenData,process.env.SECRETKEY,'1h');

                res.status(200).json({status:true,token:token,username:user.username,fullname:user.fullname,email:user.email});
            }else{
                res.status(200).json({status:false});
            }     
        
    } catch (error){

        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });

    }
}

//***********return all users in user collection 
exports.showusers = async(req,res)=>{

    const db = require("../config/db");
    const collection = db.collection('users');
    collection.find({}).toArray(function(err,users){
        if(err){
            console.log("failed to retrived users form mongoDB",err);
        }
        else{
            //return res.status(200).json({users});
            return users;
        }
    });
}
//*********************************************/////////////