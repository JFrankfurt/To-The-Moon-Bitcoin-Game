var restful = require('node-restful'),
    bson = require('bson'),
    mongoose = restful.mongoose;
    ObjectId = Schema.ObjectId;

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

module.exports = restful.model('Users', userSchema);