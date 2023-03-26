

const fs = require('fs');
const { assert } = require('console');
const ImgModel = require('../model/img.model');
const ImgService = require('../services/img.services');

exports.getprofile = async (req,res,next)=>{
    try {
        const {username}=req.body;
        const image = await ImgService.checkimg(username);
        console.log(image);



        if(!image){
          
            res.status(200).json({status:false,sucess:"No Image"});
        }else{
            res.status(200).json({status:true,sucess:"Pick the Image"});
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
        console.log(image);



        if(!image){
            ImgService.insertImg(username,{
                data:fs.readFileSync("img.uploads/"+ req.file.filename),
                contentType:"image/png",
            })
            res.status(200).json({status:true,sucess:"Image Added Successfully"});
        }else{
            res.status(200).json({status:false,sucess:"Already have a image"});
            /// need to update the image

        }

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
        
    }
}

