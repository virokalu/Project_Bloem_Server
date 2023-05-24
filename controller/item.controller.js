
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
        username:req.query.username,
        activestatus:req.query.activestatus,
        commonname:req.query.commonname,
        category:req.query.category,
        pageSize:req.query.pageSize,
        page:req.query.page,
        sort:req.query.sort,
    };

    ItemService.getItem(model,(error,results)=>{
        if(error){
            return res.status(300).json({ status:false});;
        }else{
            return res.status(200).json({ status:true,message: 'Success',data: results });
        }
    })

 }
 exports.findOne = (req,res,next)=>{
    var model = {
        id: req.params.id,
    };

    ItemService.getItemById(model,(error,results)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).json({ status:true,message: 'Success' ,data: results});
        }
    })

 }


 

exports.update = async (req,res,next)=>{
    try {
        
        // const {username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus}=req.body;
        // const successRes = await ItemService.insertItem(username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus);

        var model ={
            id:req.params.id,
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
                return res.status(200).json({ status:true,message: 'Item successfully added'});
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:false,message: 'Internal server error' });
        
    }
}

exports.delete = (req,res,next)=>{
    var model = {
        id: req.params.id,
    };

    ItemService.deleteItem(model,(error,results)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).json({ status:true,message: 'Success' });
        }
    })

 }

 exports.regBuyItem = async (req,res,next)=>{
    try {
        //console.log(req);
        // const {username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus}=req.body;
        // const successRes = await ItemService.insertItem(username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus);

        var model ={
            street : req.body.street,
            town : req.body.town,
            postalCode : req.body.postalCode,
            sellername : req.body.sellername,
            buyername : req.body.buyername,
            itemid : req.body.itemid,
            itemprice : req.body.itemprice
        };
        ItemService.insertBuyItem(model,(error,results)=>{
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
