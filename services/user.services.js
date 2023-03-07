const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');

class UserService{
    static async registerUser(username,fullname,email,password){
        try{
            const createUser = new UserModel({username,fullname,email,password});
            return await createUser.save();

        }catch(err){
            throw err;
        }
    }
    static async checkemail(email){
        try {
            return await UserModel.findOne({email});
        } catch (error) {
            throw error;
        }
    }
    static async checkuser(username){
        try {
            return await UserModel.findOne({username});
        } catch (error) {
            throw error;
        }
    }
 
    static async generateToken(tokenData,secretKey,jwt_expire){
        return jwt.sign(tokenData,secretKey,{expiresIn:jwt_expire});
    }

}

module.exports = UserService;