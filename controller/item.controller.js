const regBuyItemModel = require('../model/reg.item.model');
const regSellerModel = require('../model/sellerdetails.model');
const ItemService = require('../services/item.services');
const BarChart = require('../model/barchartmodel');



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
            district:req.body.district,
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
        district:req.query.district,
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

 exports.findSearch = (req,res,next)=>{
    var model = {
        activestatus:req.query.activestatus,
        commonname:req.query.commonname,
        district:req.query.district,
    };

    ItemService.getSearch(model,(error,results)=>{
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
            district:req.body.district,
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

exports.SellerBuyItems = async(req,res)=>{
    console.log("x");
    const db = require("../config/db");
    const collection = db.collection('regbuyitems');
    collection.find({sellername : req.params.sellername}).toArray(function(err,regbuyitems){
        if(err){
            console.log("failed to retrived users from mongoDB",err);
        }
        else{
            return res.status(200).json({regbuyitems});
            // console.log(users);
            // return users;
        }
    });
}

exports.allBuyItems = async(req,res)=>{
    console.log("y");
    const db = require("../config/db");
    const collection = db.collection('regbuyitems');
    collection.find({}).toArray(function(err,regbuyitems){
        if(err){
            console.log("failed to retrived users from mongoDB",err);
        }
        else{
            console.log(regbuyitems);
            return res.status(200).json({regbuyitems});
            // return users;
        }
    });
}

// exports.delete = (req,res,next)=>{
//     var model = {
//         id: req.params.id,
//     };

//     ItemService.deleteItem(model,(error,results)=>{
//         if(error){
//             return next(error);
//         }else{
//             return res.status(200).json({ status:true,message: 'Success' });
//         }
//     })

//  }

 exports.regBuyItem = async (req,res,next)=>{
    try {

        let Total = 0;
        let stid = " ";

        regSellerModel.findOne({username : req.body.sellername},(err,data)=>{
            if(err){
                console.error(err);
                return;
            }else{
                if(data){
                    stid = data.publishable_key;
                }
            }
        

        regBuyItemModel.findOne({}, 'apps_Total_amount',{ sort: { _id: -1 } }, (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
          
            if (data) {
              Total = data.apps_Total_amount;

                const limitAmount = 5000;
                let appFee = 0;
                let netPrice = req.body.itemprice;

                if(Total >= limitAmount){
                    appFee = req.body.itemprice*(5/100);
                    Total += netPrice;
                    netPrice = netPrice - appFee;
                }else {
                    Total = Total + netPrice;
                }

                var model ={
                    street : req.body.street,
                    town : req.body.town,
                    postalCode : req.body.postalCode,
                    sellername : req.body.sellername,
                    buyername : req.body.buyername,
                    itemid : req.body.itemid,
                    itemprice : req.body.itemprice,
                    app_fee : appFee,
                    seller_amount : netPrice,
                    apps_Total_amount : Total,
                    stid : stid,
                    category : req.body.category,
                };
                ItemService.insertBuyItem(model,(error,results)=>{
                    if(error){
                        return next(error);
                    }else{
                        return res.status(200).json({ status:true,message: 'Item successfully added' });
                    }
                })
              console.log(Total);

                /////////////////////////////////////////////////////

                var color = " ";

                if(req.body.category == "Cut Flowers"){
                    color = "red";
                }
                else if(req.body.category == "Foliage Plants"){
                    color = "pink";
                }
                else if(req.body.category == "Pot Plants"){
                    color = "green";
                }
                else if(req.body.category == "Landscaping Plants"){
                    color = "blue";
                }
                else if(req.body.category == "Bedded Plants"){
                    color = "yellow";
                }
                else if(req.body.category == "Propagatory"){
                    color = "orange";
                }
                else {
                    color = "abc";
                }

                const barChartData = {
                    category: req.body.category,
                    price: req.body.itemprice,
                    color: color,
                    username: req.body.sellername,
                  };
                  ItemService.insertBarChartData(barChartData, (err) => {
                    // if (err) {
                    //   console.log(err);
                    //   res.sendStatus(500);
                    // } else {
                    //   res.sendStatus(201);
                    // }
                  });

                ////////////////////////////////////////////////////

            } else {
              console.log('No data found');
            }
          });
        });
          console.log(Total+0);
        //console.log(req);
        // const {username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus}=req.body;
        // const successRes = await ItemService.insertItem(username,category,commonname,sciname,price,description,cashondelivery,chatactivate,imgone,imgtwo,imgthree,activestatus);
        //let Total = 7000;
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:false,message: 'Internal server error' });
        
    }
}
