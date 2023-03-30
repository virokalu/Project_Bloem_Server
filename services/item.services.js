const ItemModel = require("../model/item.model");


class ItemService{
    static async insertItem(username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus){
        try{
            const createImg = new ItemModel({username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus});
            return await createImg.save();

        }catch(err){
            throw err;
        }
    }
    
    
        

}

module.exports = ItemService;