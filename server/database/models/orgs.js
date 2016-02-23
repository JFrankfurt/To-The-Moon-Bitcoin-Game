var restful = require('node-restful'),
    mongoose = require('mongoose');

var orgSchema = new mongoose.Schema({
    orgName: {
        type: String,
        required: true
    },
    orgID: {
        type: String,
        required: true
    }
});

module.exports = restful.model('orgs', orgSchema);