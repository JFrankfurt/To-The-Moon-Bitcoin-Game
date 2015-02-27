var restful = require('node-restful'),
    mongoose = require('mongoose');

var permissionsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    orgID: {
        type: String,
        required: true
    }
});

module.exports = restful.model('permissions', permissionsSchema);