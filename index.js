var cluster = require('cluster'),
    numCPUs = require('os').cpus().length;

var request = require('request'),
    qs = require('querystring'),
    bodyParser = require('body-parser');

var express = require('express'),
    app = express(),
    router = express.Router();

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died', worker.process.pid, signal || code);
        cluster.fork();
    });
} else {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    router.use(function(req, res, next){
        console.log("we got a request...");
        next();
    });
    router.route('/endgame/:address')
        .get(function(req, res) {
            request.get('http://coinding.com/bitcoin/address/' + req.params.address, function(err, data){
                if (err) {
                    res.send(err);
                    } else {
                    res.json(data);
                    }
                }
            )
        });
    router.route('/endgame/:address/:amount')
        .get(function(req, res) {
            request.get('')
        });


    app.use(express.static(__dirname + '/public'));
    app.listen(process.env.PORT || 3000);
}