const cartService = require("../services/cart.service");

exports.create = (req,res,next)=>{
    var model = {
        username: req.body.username,
        items: req.body.items
    };

    cartService.addCart(model,(error,results)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
}

exports.findAll = (req,res,next)=>{
    cartService.getCart({username: req.params.username},(error,results)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
}

exports.delete = (req,res,next)=>{
    var model = {
        username: req.body.username,
        items: req.body.items,
        qty: req.body.qty
    };

    cartService.removeCartItem(model,(error,results)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
}