var mongoose = require('mongoose');


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
        }
    });

module.exports = userSchema;