const ItemModel = require("../model/item.model");
const regBuyItemModel = require("../model/reg.item.model");


// class ItemService{
//     static async insertItem(username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus){
//         try{
//             const createImg = new ItemModel({username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus});
//             return await createImg.save();

//         }catch(err){
//             throw err;
//         }
//     }
// }

async function insertItem(params,callbacks){
    const Item = new ItemModel(params);
    Item.save()
    .then((response)=>{
        return callbacks(null,response);
    })
    .catch((error)=>{
        return callbacks(error);
    })
}

async function insertBuyItem(params,callbacks){
    const buyItem = new regBuyItemModel(params);
    buyItem.save()
    .then((response)=>{
        return callbacks(null,response);
    })
    .catch((error)=>{
        return callbacks(error);
    })
}

async function getItem(params,callback){
    const commonname = params.commonname;
    const category = params.category;
    var condition ={};

    if(commonname){
        condition["commonname"] = {
            $regex: new RegExp(commonname), $options:"i"
        };
    }

    if(category){
        condition["category"] = category;
    }
    let perPage = Math.abs(params.pageSize);
    let page = (Math.abs(params.page) || 1) - 1;

    ItemModel
    .find(condition)
    .sort(params.sort)
    .limit(perPage)
    .skip(perPage * page)
    .then((response)=>{
        return callback(null,response);
    })
    .catch((error)=>{
        return callback(error);
    })

}

async function getItemById(params,callback){
    const id = params.id;

    ItemModel
    .findById(id)
    .then((response)=>{
        return callback(null,response);
    })
    .catch((error)=>{
        return callback(error);
    })

}
async function updateItem(params,callback){
    const id = params.id;

    ItemModel
    .findByIdAndUpdate(id,params,{useFindAndModify:false})
    .then((response)=>{
        if(!response){
            callback(`Cannot Update Product Id ${id}`)
        }else callback(null,response);
    })
    .catch((error)=>{
        return callback(error);
    })
}
async function deleteItem(params,callback){
    const id = params.id;

    ItemModel
    .findByIdAndRemove(id)
    .then((response)=>{
        if(!response){
            callback(`Cannot delete Product Id ${id}`)
        }else callback(null,response);
    })
    .catch((error)=>{
        return callback(error);
    })
}


module.exports = {
    insertItem,
    getItem,
    updateItem,
    deleteItem,
    getItemById,
    insertBuyItem,
};