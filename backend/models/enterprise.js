const mongoose =  require('mongoose');

//blueprint 
const enterpriseSchema = mongoose.Schema({
    username: String,
    password: String
});

module.exports = mongoose.model("Enterprise", enterpriseSchema);