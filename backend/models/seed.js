
const mongoose =  require('mongoose');

//blueprint 
const farmerSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    owner:String,
    garden:String,
    name: String,
    progress:Number,
    producer: String,
    totalGrowDays: Number
});

module.exports = mongoose.model("Seed", farmerSchema);