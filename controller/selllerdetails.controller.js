const Seller = require('../model/sellerdetails.model');
const User = require('../model/user.model');

exports.sellers = async(req,res) => {
    const seller = new Seller({
        username : req.body.username,
        publishable_key : req.body.publishable_key,
        stripe_id : req.body.stripe_id,
    });

    seller.save((err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          } 
    })
}

exports.updateseller = async(req,res) => {
    
    let upusername = req.params.username;
    let upsellerStates = req.body.upsellerStates;

    User.findOneAndUpdate(
        {username: upusername},
        {$set:{sellerStates : upsellerStates}},
        {new:true},
        (err, data) => {
            if (err) {
              res.status(500).send(err.message);
            } else if (!data) {
              res.send('User not found');
            } else {
              res.send(data);
            }
        }
    )
}