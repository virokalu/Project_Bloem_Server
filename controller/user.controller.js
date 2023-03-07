const UserService = require('../services/user.services');

exports.register = async(req,res,next)=>{
    try{
        const {username,fullname,email,password} = req.body;

        const user = await UserService.checkuser(username);
        const emailcheck = await UserService.checkemail(email);

        if(!user && !emailcheck){
            const successRes = await UserService.registerUser(username,fullname,email,password);
            res.json({status:true,sucess:"User Registered Successfully"});
            console.log("User Registered Successfully");
        }else if(emailcheck){
            res.json({status:false,exist:"email",sucess:"User Not Registered"});
            //console.log("User Not Registered email");
        }else if(user){
            res.json({status:false,exist:"user",sucess:"User Not Registered"});
            //console.log("User Not Registered username");

        }   

    } catch (err){

        throw err;

    }
}
exports.login = async(req,res,next)=>{
    try{
        const {username,password} = req.body;

        const user = await UserService.checkuser(username);

        if(!user){
            throw new Error('User Dont Exist');
        }
        const isMatch = await user.comparePassword(password);

        if(isMatch===false){
            throw new Error('Password Invalid');
        }
        let tokenData = {_id:user._id,username:user.username};

        const token = await UserService.generateToken(tokenData,"secretKey",'1h');

        res.status(200).json({status:true,token:token});

    } catch (err){

        throw err;

    }
}