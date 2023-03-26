const ImgModel = require("../model/img.model");


class ImgService{
    static async insertImg(username,img){
        try{
            const createImg = new ImgModel({username,img});
            return await createImg.save();

        }catch(err){
            throw err;
        }
    }
    
    static async checkimg(username){
        try {
            //console.log("run check");

            return await ImgModel.findOne({username: username});
        } catch (error) {
            throw error;
        }
    }
        

}

module.exports = ImgService;