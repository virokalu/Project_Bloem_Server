const cart  = require("../model/cart.model");
var async = require("async");

async function addCart(params,callback){
    
    if(!params.username){
        return callback({
            message:"Username Required"
        });
    }

    cart.findOne({ username:params.username},function (err,cartDB){
        if(err){
            return callback(err);
        }
        else{
            if(cartDB == null){
                const cartModel = new cart({
                    username: params.username,
                    items: params.items
                });

                cartModel
                .save()
                .then((response)=>{
                    return callback(null,response);
                })
                .catch((error)=>{
                    return callback(error);
                });
            }
            else if(cartDB.items.length == 0){
                cartDB.items = params.items;
                cartDB.save();
                return callback(null,cartDB);
            }
            else{
                async.eachSeries(params.items, function(item,asyncDone){
                    let itemIndex = cartDB.items.findIndex(p=>p.item == item.item);

                    if(itemIndex === -1){
                        cartDB.items.push({
                            item:item.item,
                            qty:item.qty
                        });
                        cartDB.save(asyncDone);
                    }
                    else{
                        cartDB.items[itemIndex].qty = cartDB.items[itemIndex].qty + item.qty;
                        cartDB.save(asyncDone);
                    }
                });

                return callback(null, cartDB);
            }
        }
    });
}

async function getCart(params,callback){
    cart.findOne({username: params.username})
    .populate({
        path: "items",
        populate: {
            path: 'item',
            model: 'item',
            //select: 'commonname price imgone category'
        }
    })
    .then((response)=>{
        return callback(null,response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

async function removeCartItem(params,callback){
    cart.findOne({username: params.username}, function(err,cartDB){
        if(err){return callback(err);}
        else{
            if(params.id && params.qty){
                const itemid = params.id;
                const qty = params.qty;

                if(cartDB.items.length === 0){
                    return callback(null,"Cart empty!");

                }else{
                    let itemIndex = cartDB.items.findIndex(p=>p.item==itemid);

                    if(itemIndex === -1){
                        return callback(null, "Invalid Product!");

                    }else{
                        if(cartDB.items[itemIndex].qty ===qty){
                            cartDB.items.splice(itemIndex,1);
                        }
                        else if(cartDB.items[itemIndex].qty > qty){
                            cartDB.items[itemIndex].qty = cartDB.items[itemIndex].qty - qty;
                        }
                        else {
                            return callback(null, "Enter Lower Qty")
                        }
                        cartDB.save((err,cartM)=>{
                            if(err) return callback(err);
                            return callback(null, "Cart Updated!");
                        })
                    }
                }

            }
        }
    })
}

module.exports = {
    addCart,
    getCart,
    removeCartItem,
}