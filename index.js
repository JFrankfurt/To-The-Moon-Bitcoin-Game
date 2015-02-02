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

    app.use('/endgame', router);

    app.use(express.static(__dirname + '/public'));
    app.use(function(req, res, next) {
    });
    app.get('/balance', function(request, response) {

    });
    app.get('/endGame/:address', function(request, response){
            //respond with the number of satoshis this wallet has claimed from our service (currently just does balance)
        var query = qs.stringify(request.param("address"));

        next();
    });
    app.post('/endGame/:address/:ammount', function(request, response) {
        response.send(
            //alert that cashout was successful or failed (minimum not met, address not real)
        );
    });
    app.listen(process.env.PORT || 3000);
}