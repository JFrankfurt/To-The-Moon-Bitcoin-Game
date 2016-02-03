//dependencies
var cluster = require('cluster'),
    numCPUs = require('os').cpus().length;

var helmet = require('helmet'),
    express = require('express'),
    logger = require('morgan'),
    Chain = require('chain-node'),
    app = express();

var chain = new Chain({
    keyID: '2a65bfba18f80dd8f0bd141a668a8961',
    keySecret: '535451d79e9e0ee18f95d24003ae24b0',
    blockChain: 'bitcoin'
});

//split process to number of cpus on machine
if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died', worker.process.pid, signal || code);
        cluster.fork();
    });
} else {
    process.on('uncaughtException', function(err) {
        console.log(err);
        process.kill();
    });
    app.use(helmet());
    app.use(helmet.hidePoweredBy({setTo: "Perl 2.0.0"}));
    app.use(logger('combined'));

    //middleware


    //routes
    app.use(express.static(__dirname + '/public'));
    app.listen(process.env.PORT || 3000);
}
