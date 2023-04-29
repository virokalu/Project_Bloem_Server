const CardModel = require("../model/card.model");


async function insertCard(params,callbacks){
    const Card = new CardModel(params);
    Card.save()
    .then((response)=>{
        return callbacks(null,response);
    })
    .catch((error)=>{
        return callbacks(error);
    })
}

module.exports = {
    insertCard,
};