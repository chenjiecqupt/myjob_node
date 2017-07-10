var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  var str= '没有读取到数据';
    fs.readFile("routes/test.txt",'utf-8',function(err,data){
        if(err){
            console.log(err);
        }else{
            console.log(data);
            str = data;
            res.render('test1', { title: 'Express' ,str: str});
        }
    });
    console.log('test1');
    /*res.render('test1', { title: 'Express' ,str: str});*/
});
router.get('/test', function(req, res, next) {
    res.render('index', { title: 'Express' ,str: '测试'});
    console.log('test1');
    /*res.render('test1', { title: 'Express' ,str: str});*/
});
router.get('/js', function(req, res, next) {
    var str= '没有读取到数据';
    fs.readFile("routes/index.js",'utf-8',function(err,data){
        if(err){
            console.log(err);
        }else{
            str = data;
            res.render('test1', { title: 'Express' ,str: str});
        }
    });
    console.log('test1');
    /*res.render('test1', { title: 'Express' ,str: str});*/
});
router.get('/json', function(req, res, next) {
    var str= '没有读取到数据';
    fs.readFile("routes/test.json",'utf-8',function(err,data){
        if(err){
            console.log(err);
        }else{
            str = data;
            res.render('test1', { title: 'Express' ,str: str});
        }
    });
    console.log('json');
    /*res.render('test1', { title: 'Express' ,str: str});*/
});
router.get('/img', function(req, res, next) {
    var str= '没有读取到数据';
    fs.readFile("images/qianwuyingluo1.jpg",'utf-8',function(err,data){
        if(err){
            console.log(err);
        }else{
            str = JSON.parse(data);
            res.render('test1', { title: 'Express' ,str: str});
        }
    });
    console.log('test1');
    /*res.render('test1', { title: 'Express' ,str: str});*/
});
router.get('/angular', function(req, res, next) {
    res.render('angular', { title: 'angular 框架'});
    /*res.send('respond with a resource');*/
});
module.exports = router;
