
const mongoose =  require('mongoose');

//blueprint 
const farmerSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    price: Number,
    type: Number,
    enterpriseId: mongoose.Types.ObjectId,
    score: Number,
    qnt: Number,
    available: Boolean,
    totalGrowDays: Number
});

module.exports = mongoose.model("Articl", farmerSchema);