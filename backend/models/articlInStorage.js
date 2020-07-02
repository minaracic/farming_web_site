
const mongoose =  require('mongoose');

//blueprint 
const farmerSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    gardenId: mongoose.Types.ObjectId, 
    articlId: mongoose.Types.ObjectId, 
    qnt: Number
});

module.exports = mongoose.model("ArticlInStorage", farmerSchema, "storages.articles");