var restful = require('node-restful'),
    mongoose = require('mongoose');

//User schema
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    wallet: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    cashout: {
        type: Boolean,
        required: true
    }
    });

module.exports = restful.model('users', userSchema);