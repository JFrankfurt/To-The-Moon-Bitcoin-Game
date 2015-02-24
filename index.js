//dependencies
var cluster = require('cluster'),
    numCPUs = require('os').cpus().length;

var helmet = require('helmet'),
    express = require('express'),
    logger = require('morgan'),
    app = express();

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
    app.use('/api', require('./routes/api'));

    app.use(express.static(__dirname + '/public'));
    app.listen(process.env.PORT || 3000);
}