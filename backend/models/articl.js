
const mongoose =  require('mongoose');

//blueprint 
const farmerSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    type: Number,
    enterpriseId: String,
    producer: String,
    score: Number,
    qnt: Number
});

module.exports = mongoose.model("Articl", farmerSchema);