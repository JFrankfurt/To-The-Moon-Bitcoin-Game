var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    wallet: String
});

module.exports = mongoose.model('User', userSchema);