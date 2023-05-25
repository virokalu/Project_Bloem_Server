const UserService = require('../services/user.services');
const CardService = require('../services/card.service');
const UserModel = require('../model/user.model');
const bcrypt = require('bcrypt');
                                                                                                    
require('dotenv').config();

exports.register = async(req,res,next)=>{
    try{
        const {username,fullname,email,district,password} = req.body;

        const user = await UserService.checkuser(username);
        const emailcheck = await UserService.checkemail(email);

        if(!user && !emailcheck){
            const successRes = await UserService.registerUser(username,fullname,email,district,password);
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

                res.status(200).json({status:true,token:token,username:user.username,fullname:user.fullname,email:user.email,district:user.district,sellerStates:user.sellerStates});
            }else{
                res.status(200).json({status:false});
            }     
        
    } catch (error){

        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });

    }
}
exports.update = async(req,res,next)=>{
    try{
        const {username,newusername,email,fullname,district} = req.body;

        const user = await UserService.checkuser(username);

        userCheck=null;
        emailcheck=null;
        if(username!=newusername){
            userCheck = await UserService.checkuser(newusername);
        }
        if(user.email!=email){
            emailcheck = await UserService.checkemail(email);
        }

        if(!userCheck && !emailcheck){
            UserModel.findOneAndUpdate(
                {username: username},
                {$set:{username: newusername,email:email,fullname:fullname,district:district}},
                {new:true},
                (err, data) => {
                    if (err) {
                      res.status(500).send(err.message);
                    } 
                }
            )
            const newuser = await UserService.checkuser(newusername);

            res.status(200).json({status:true,username:newuser.username,fullname:newuser.fullname,email:newuser.email,sucess:"User Registered Successfully"});

            //console.log("User Registered Successfully");
        }else if(emailcheck){
            res.status(200).json({status:false,exist:"email",sucess:"User Not Registered"});
            //console.log("User Not Registered email");
        }else if(userCheck){
            res.status(200).json({status:false,exist:"user",sucess:"User Not Registered"});
            //console.log("User Not Registered username");

        }   

    } catch (err){

        throw err;

    }
}

exports.emailcheck = async(req,res,next)=>{
    try{
        const {email} = req.body;

        const emailcheck = await UserService.checkemail(email);

        if(emailcheck){
            res.status(200).json({status:true,username:emailcheck.username,success:"Valid Email"});
            //console.log("User Registered Successfully");
        }else if(!emailcheck){
            res.status(200).json({status:false,success:"No Email"});
            //console.log("User Not Registered email");
        }
    } catch (err){

        throw err;

    }
}

exports.updatepassword = async(req,res) => {
    
    let username = req.body.username;
    let oldpassword = req.body.oldpassword;
    let newpassword = req.body.newpassword;

    try{

        const user = await UserService.checkuser(username);
        const isMatch = await user.comparePassword(oldpassword);

            if(isMatch==true){
                const salt = await(bcrypt.genSalt(10));
                const hashpass =await bcrypt.hash(newpassword,salt);

                UserModel.findOneAndUpdate(
                    {username: username},
                    {$set:{password : hashpass}},
                    {new:true},
                    (err, data) => {
                        if (err) {
                          res.status(500).send(err.message);
                        } else if (!data) {
                          res.send('User not found');
                        } else {
                            res.status(200).json({status:true});
                        }
                    }
                )
            }else{
                res.status(200).json({status:false});
            }     
        

    }catch(err){
        throw err;
    }
}



exports.resetpassword = async(req,res) => {
    
    let username = req.body.username;
    let newpassword = req.body.newpassword;

    try{

        //const user = await UserService.checkuser(username);
        //const isMatch = await user.comparePassword(oldpassword);

            //if(isMatch==true){
                const salt = await(bcrypt.genSalt(10));
                const hashpass =await bcrypt.hash(newpassword,salt);

                UserModel.findOneAndUpdate(
                    {username: username},
                    {$set:{password : hashpass}},
                    {new:true},
                    (err, data) => {
                        if (err) {

                            res.status(500).send(err.message);

                        } else if (!data) {

                            res.send('User not found');

                        } else {

                            res.status(200).json({status:true});
                        }
                    }
                )
            // }else{
            //     res.status(200).json({status:false});
            // }     
        

    }catch(err){

        throw err;
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
            return res.status(200).json({users});
            // console.log(users);
            // return users;
        }
    });
}

exports.addCard = async (req,res,next)=>{
    try {
        //console.log(req);
        // const {username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus}=req.body;
        // const successRes = await ItemService.insertItem(username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus);

        var model ={
            cardholdername : req.body.cardholdername,
            cardnumber : req.body.cardnumber,
            date : req.body.date,
            ccv : req.body.ccv,
            username : req.body.username
        };
        CardService.insertCard(model,(error,results)=>{
            if(error){
                return next(error);
            }else{
                return res.status(200).json({ status:true,message: 'Card details successfully added' });
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:false,message: 'Internal server error' });
        
    }
}
//*********************************************/////////////