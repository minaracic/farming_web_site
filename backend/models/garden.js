
const mongoose =  require('mongoose');

//blueprint 
const farmerSchema = mongoose.Schema({
    owner: String,
    name: String,
    place: String,
    totalSeeds: Number,
    numOfUsedSeeds: Number,
    water: Number,
    temperature: Number,
    width: Number,
    height: Number
});

module.exports = mongoose.model("Garden", farmerSchema);