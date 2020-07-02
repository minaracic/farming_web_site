const mongoose =  require('mongoose');

//blueprint 
const farmerSchema = mongoose.Schema({
  _id:  mongoose.Types.ObjectId,
  articlIds: Array,
  gardenId: mongoose.Types.ObjectId,
  enterpriseId: mongoose.Types.ObjectId,
  dateOfOrder: Date,
  status: Number
});

module.exports = mongoose.model("Order", farmerSchema);