var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var userSchema = new Schema({
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