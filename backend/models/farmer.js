const mongoose =  require('mongoose');

//blueprint 
const farmerSchema = mongoose.Schema({
  username:String,
  password:String,
  name: String,
  surname: String,
  dateOfBirth: String,
  placeOfBirth: String,
  phone: String,
  email: String
});

module.exports = mongoose.model("Farmer", farmerSchema);