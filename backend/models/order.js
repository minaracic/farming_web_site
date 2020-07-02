const mongoose =  require('mongoose');

//blueprint 
const farmerSchema = mongoose.Schema({
  articlIds: Array,
  gardenId: mongoose.Types.ObjectId,
  dateOfOrder: Date,
  status: Number
});

module.exports = mongoose.model("Order", farmerSchema);