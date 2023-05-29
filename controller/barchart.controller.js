const barchart = require('../model/barchartmodel');
const barModel = require('../model/barchartmodel');
require('dotenv').config();

exports.showbarchartData = async(req,res)=>{

    const db = require("../config/db");
    const collection = db.collection('barcharts');
    collection.find({username : req.params.sellername}).toArray(function(err,bardata){
        if(err){
            console.log("failed to retrived barchart data form mongoDB",err);
        }
        else{
            //return res.status(200).json({users});
            console.log(bardata);
            return res.status(200).json(bardata);
            //return bardata;
        }
    });
}

// exports.insertBarChartData = async(req, res) => {
//     const bardata = new barchart({
//         category: req.body.day,
//         sum: req.body.sum,
//         color: req.body.color,
//         username: req.body.username,
//     })

//     bardata.save((err) => {
//         if (err) {
//             console.log(err);
//             res.sendStatus(500);
//           } else {
//             res.sendStatus(201);
//           }
//     });
// }