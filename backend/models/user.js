const mongoose =  require('mongoose');

//blueprint 
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    type: Number,
    approvedByAdmin: Number
});

module.exports = mongoose.model("User", userSchema);