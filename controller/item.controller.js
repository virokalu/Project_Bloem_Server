
const ItemService = require('../services/item.services');
const ItemModel = require("../model/item.model");



exports.additem = async (req,res,next)=>{
    try {
        
        const {username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus}=req.body;
        const successRes = await ItemService.insertItem(username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus);
        return res.status(200).json({ status:true,message: 'Item successfully added' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:false,message: 'Internal server error' });
        
    }
}

