
const mongoose =  require('mongoose');

//blueprint 
const farmerSchema = mongoose.Schema({
    owner:String,
    gardenName:String,
    name: String,
    progress:Number
});

module.exports = mongoose.model("Seed", farmerSchema);