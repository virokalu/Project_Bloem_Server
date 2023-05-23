// const regSellerModel = require('../model/sellerdetails.model');

// async function updateUser(params,callback){
//     const username = params.username;

//     regSellerModel
//     .findByIdAndUpdate(username,params,{useFindAndModify:false})
//     .then((response)=>{
//         if(!response){
//             callback(`Cannot Update Product ${username}`)
//         }else callback(null,response);
//     })
//     .catch((error)=>{
//         return callback(error);
//     })
// }