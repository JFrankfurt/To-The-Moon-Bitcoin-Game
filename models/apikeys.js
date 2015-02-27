var restful = require('node-restful'),
    mongoose = require('mongoose');

var apiKeySchema = new mongoose.Schema({
    orgID: {
        type: String,
        required: true
    },
    accessKey: {
        type: String,
        required: true
    },
    secretKey: {
        type: String,
        required: true
    }
});

module.exports = restful.model('apiKey', apiKeySchema);