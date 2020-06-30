
const mongoose =  require('mongoose');

//blueprint 
const farmerSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    gardenId: mongoose.Types.ObjectId, 
    qnt: Number,
    hasArrived: Boolean
    //articlId
});

module.exports = mongoose.model("ArticlInStorage", farmerSchema, "storages.articles");