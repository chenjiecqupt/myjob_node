/**
 * Created by chenjie on 2017/6/28.
 */
var express = require('express');
var router = express.Router();
var Comment = require('../server/test1');
var json1 = { title: 'Express' ,name: 'chenjie'};
/* GET users listing. */
router.get('/', function(req, res, next) {
    /*res.render('admin', json1);*/
    /*res.send('respond with a resource');*/
    var comment = new Comment();
    comment.readComment(function(err,result){
        if(err){
            console.log('读取数据库失败！');
            res.status(404).end(err);
        }else{
            res.render('admin',{
                items: result,
                name: 'chenjie'
            });
        }
    })
});
router.get('/a', function(req, res, next) {
    res.render('test', { title: '/a' ,str: 'aaaaaaaaa'});
    /*res.send('respond with a resource');*/
});
module.exports = router;
