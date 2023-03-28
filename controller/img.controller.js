

const ImgService = require('../services/img.services');
const ImgModel = require("../model/img.model");


exports.getprofile = async (req,res,next)=>{
    try {
        const { username } = req.body;
        const image = await ImgService.checkimg(username);
        //console.log(image);



        if(!image){
            
            res.status(200).json({status:false,sucess:"No Image"});
        }else{

            res.status(200).json({status:true,sucess:"Image",img:image.img});
            //res.status(200).json({status:true,sucess:"Pick Image"});
            /// need to update the image

        }


        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
        
    }
}


exports.addprofile = async (req,res,next)=>{
    try {
        
        const {username,img}=req.body;
        const image = await ImgService.checkimg(username);
        //console.log(image);



        if(!image){
            const successRes = await ImgService.insertImg(username,img);
            //await ImgService.insertImg(username,img);
            res.status(200).json({status:true,sucess:"Image Added Successfully"});
        }else{
            var item = {
                username:username,
                img:img

            }

            await ImgModel.updateOne({username: username},{$set:item});
            res.status(200).json({status:true,sucess:"Update the image"});
            /// need to update the image

        }

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
        
    }
}

