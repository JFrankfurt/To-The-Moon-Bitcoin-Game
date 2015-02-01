var cluster = require('cluster'),
    numCPUs = require('os').cpus().length;

var request = require('request'),
    qs = require('querystring');

var express = require('express'),
    app = express();

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
    app.use(function(req, res, next) {
    });
    app.get('/balance', function(request, response) {

    });
    app.get('/endGame/:address', function(request, response){
            //respond with the number of satoshis this wallet has claimed from our service (currently just does balance)
        var query = qs.stringify(request.param("address"));
        request.get('http://api.coinding.com/bitcoin/address' + query, function(err, response, body){
            if(err || response.statusCode !== 200) {
                return callback(new Error(err ? err : response.statusCode));
            }
            try {
                result = JSON.parse(body);
                result.total.balance;
            } catch (error) {
                console.log(error);
            }
        });
        next();
    });
    app.post('/endGame/:address/:ammount', function(request, response) {
        response.send(
            //alert that cashout was successful or failed (minimum not met, address not real)
        );
    });
    app.listen(process.env.PORT || 3000);
}