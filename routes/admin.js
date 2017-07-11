/**
 * Created by chenjie on 2017/6/28.
 */
var express = require('express');
var router = express.Router();
var Comment = require('../server/test1');
var json1 = { title: 'Express' ,name: 'chenjie'};
/* GET users listing. */
/*router.get('/', function(req, res, next) {
    /!*res.render('admin', json1);*!/
    /!*res.send('respond with a resource');*!/
    console.log('req.body:'+req.body.name);
    var comment = new Comment();
    console.log('req.body:'+req.body);
    comment.readComment(function(err,result){
        if(err){
            console.log('读取数据库失败！');
            res.status(404).end(err);
        }else{
            res.render('admin',{
                items: result,
                name: 'chenjie'
            });
            /!*console.log(res);*!/

        }
    })
});*/
router.get('/sql/admin', function(req, res, next) {
    /*res.render('admin', json1);*/
    /*res.send('respond with a resource');*/
    console.log('req.body:'+req.body.title);
    var comment = new Comment();
    console.log('req.body:'+req.body);
    comment.readComment(function(err,result){
        if(err){
            console.log('读取数据库失败！');
            res.status(404).end(err);
        }else{
            res.send({
                items: result,
                name: 'chenjie'
            });
        }
    })
});
router.get('/', function(req, res, next) {
    res.render('admin',{name:'admin'});
    /*res.send('respond with a resource');*/
});
module.exports = router;
