
const ItemService = require('../services/item.services');



exports.addItem = async (req,res,next)=>{
    try {
        
        // const {username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus}=req.body;
        // const successRes = await ItemService.insertItem(username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus);

        var model ={
            username:req.body.username,
            category:req.body.category,
            commonname:req.body.commonname,
            sciname:req.body.sciname,
            price:req.body.price,
            description:req.body.description,
            cashondelivery:req.body.cashondelivery,
            chatactivate:req.body.chatactivate,
            imgone:req.body.imgone,
            imgtwo:req.body.imgtwo,
            imgthree:req.body.imgthree,
            activestatus:req.body.activestatus
        }
        ItemService.insertItem(model,(error,results)=>{
            if(error){
                return next(error);
            }else{
                return res.status(200).json({ status:true,message: 'Item successfully added' });
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:false,message: 'Internal server error' });
        
    }
}

 exports.findAll = (req,res,next)=>{
    var model = {
        commonname:req.query.commonname,
        category:req.query.category,
        pageSize:req.query.pageSize,
        page:req.query.page
    };

    ItemService.getItem(model,(error,results)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).json({ status:true,message: 'Success' });
        }
    })

 }
 exports.findOne = (req,res,next)=>{
    var model = {
        id: req.query.id,
    };

    ItemService.getItemById(model,(error,results)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).json({ status:true,message: 'Success' });
        }
    })

 }


 

exports.update = async (req,res,next)=>{
    try {
        
        // const {username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus}=req.body;
        // const successRes = await ItemService.insertItem(username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus);

        var model ={
            id:req.query.id,
            username:req.body.username,
            category:req.body.category,
            commonname:req.body.commonname,
            sciname:req.body.sciname,
            price:req.body.price,
            description:req.body.description,
            cashondelivery:req.body.cashondelivery,
            chatactivate:req.body.chatactivate,
            imgone:req.body.imgone,
            imgtwo:req.body.imgtwo,
            imgthree:req.body.imgthree,
            activestatus:req.body.activestatus
        }
        ItemService.updateItem(model,(error,results)=>{
            if(error){
                return next(error);
            }else{
                return res.status(200).json({ status:true,message: 'Item successfully added' });
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:false,message: 'Internal server error' });
        
    }
}

exports.delete = (req,res,next)=>{
    var model = {
        id: req.query.id,
    };

    ItemService.deleteItem(model,(error,results)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).json({ status:true,message: 'Success' });
        }
    })

 }
