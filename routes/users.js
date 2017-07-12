var express = require('express');
var router = express.Router();
var query = require('../server/test2');
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
router.get('/query',function(req,res,next){
    console.log('id:'+req.query.id);
    if(req.query.id!==''){
        query("select * from person where id='"+req.query.id+"'",function(err,vals,fields){
            console.log('err:'+err);
            console.log('vals:'+vals);
            console.log('fields:'+fields);
            if(err===null){
                res.send({
                    name:'chenjie',
                    items: vals
                });
            }else{
                res.send(err);
            }
        })
    }else{
        query("select * from person",function(err,vals,fields){
            console.log('err:'+err);
            console.log('vals:'+vals);
            console.log('fields:'+fields);
            if(err===null){
                res.send({
                    name:'chenjie',
                    items: vals
                });
            }else{
                res.send(err);
            }
        })
    }

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
