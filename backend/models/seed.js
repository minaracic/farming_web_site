
const mongoose =  require('mongoose');

//blueprint 
const farmerSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    gardenId: mongoose.Types.ObjectId,
    producerId: mongoose.Types.ObjectId,
    name: String,
    progress:Number,
    totalGrowDays: Number,
    harvested: Boolean
});

module.exports = mongoose.model("Seed", farmerSchema);