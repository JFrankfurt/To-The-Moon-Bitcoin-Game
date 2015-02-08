var cluster = require('cluster'),
    numCPUs = require('os').cpus().length;

var request = require('request'),
    qs = require('querystring'),
    bodyParser = require('body-parser');

var helmet = require('helmet');

var mongoose = require ('mongoose');

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
    app.use(helmet());
    var router = express.Router();
    app.use(helmet.hidePoweredBy({setTo: "Perl 2.0.0"}));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //confirm the request was received;
    router.use(function(req, res, next){
        console.log("we got a request...");
        next();
    });
    //should accept requests from mount directive
    router.route('/:address')
        .post(function(req, res) {
            console.log("mount request worked");
            request.get('http://api.coinding.com/bitcoin/address/' + req.params.address)
                .on('response', function(response) {
                    console.log(response.statusCode)
                }).pipe(request.put(''))
        });
    //should accept requests from cash out directive
    router.route('/:address/:amount')
        .post(function(req, res) {
            var params = {
                url: 'https://blockchain.info/merchant/a5f71e9f-d46f-439a-b418-cb6f83f972d3',
                password: 'MoonBase GameFace',
                to: request.params.address,
                amount: request.params.amount,
                from: '1Ke6KNxyai5Pa1ffnumFCtsQhy21yZC2wZ'
            };

            //how does querystring work?
            var please = qs.stringify(params);
            request.get(please, function(err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(data);
                }
            });
        });

    app.use(express.static(__dirname + '/public'));
    app.listen(process.env.PORT || 3000);
}