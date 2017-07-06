var express = require('express');
var router = express.Router();
/*var request = require('request');*/
var json1 = { title: 'Express' ,str: 'info for users'};
/* GET users listing. */
/*router.get('/', function(req, res, next) {
    var method = req.method.toUpperCase();
    var proxy_url = 'test.json';

    var options = {
        headers: {"Connection": "close"},
        url: proxy_url,
        method: method,
        json: true,
        body: req.body
    };

    function callback(error, response, data) {
        if (!error && response.statusCode == 200) {
            console.log('------接口数据------',data);

            res.json(data)
        }
    }

    request(options, callback);
    res.render('test1', json1);
    /!*res.send('respond with a resource');*!/
});*/
router.get('/a', function(req, res, next) {
    res.render('a', { title: '/a' ,str: 'aaaaaaaaa'});
    /*res.send('respond with a resource');*/
});
module.exports = router;
/*
var express = require('express');
var router = express.Router();
var request = require('request');

router.all('/!*', function(req, res){
    var method = req.method.toUpperCase();
    var proxy_url = 'http:www.xx.com/api';

    var options = {
        headers: {"Connection": "close"},
        url: proxy_url,
        method: method,
        json: true,
        body: req.body
    };

    function callback(error, response, data) {
        if (!error && response.statusCode == 200) {
            console.log('------接口数据------',data);

            res.json(data)
        }
    }

    request(options, callback);
})

module.exports = router;*/
