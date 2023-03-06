const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URL;

const connection = mongoose.createConnection(uri,()=>{
    console.log("MongoDB Connected");
}).on('error',()=>{
    console.log("MongoDB Connected Error");
});

module.exports = connection;