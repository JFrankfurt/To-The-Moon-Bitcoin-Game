var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var request = require('request');
var express = require('express');
var app = express();

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died', worker.process.pid, signal || code);
        cluster.fork();
    });
} else {
    app.use(express.static(__dirname + '/public'));
    app.use(function(request, response, next) {
        next();
    });
    app.get('/balance', function(request, response) {

    });
    app.get('/endGame/:address', function(request, response){
        response.send(
            //respond with the number of satoshis this wallet has claimed from our service
        );
    });
    app.post('/endGame/:address/:ammount', function(request, response) {
        response.send(
            //alert that cashout was successful or failed (minimum not met, address not real)
        );
    });
    app.listen(process.env.PORT || 3000);
}