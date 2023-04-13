
const ItemService = require('../services/item.services');



exports.additem = async (req,res,next)=>{
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

