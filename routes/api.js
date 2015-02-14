//Dependencies
var express = require('express'),
    router = express.Router();

//Models
var User = require('../models/user');

//Routes
User.methods(['get', 'put', 'post']);
User.register(router, '/user');
//confirm the request was received;
router.use(function(req, res, next){
    console.log("we got a request...");
    next();
});

//should accept requests from mount directive
router.route('/:email/:address')
    .post(function(req, res) {
        console.log("mount request worked");

//This should take the email and address params and check the DB for the email.
  //If the email exists, add the wallet to it (even if it exists elsewhere)
    //notify the user that address has been successfully added to the email
    //at the end of every week, send the player an email if they have balance enough to cash out
  //If the email does not exist, add it to the collection and associate the wallet with it.
//        request.get('http://api.coinding.com/bitcoin/address/' + req.params.address)
//            .on('response', function(response) {
//                console.log(response.statusCode)
//            }).pipe(request.put(''))
    });

//should accept requests from cash out directive
router.route('/:address/:earned')
    .post(function(req, res) {
        var params = {
            url: 'https://blockchain.info/merchant/a5f71e9f-d46f-439a-b418-cb6f83f972d3',
            password: 'MoonBase GameFace',
            to: request.params.address,
            amount: request.params.earned,
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

module.exports = router;