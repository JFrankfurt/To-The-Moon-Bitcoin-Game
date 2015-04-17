var restful = require('node-restful'),
    mongoose = require('mongoose');

//User schema
var userSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      index: { unique: true }
    },
    email: {
      type: String,
      required: true
    },
    wallet: {
      type: Object,
      required: true
    }
    });

module.exports = restful.model('users', userSchema);
