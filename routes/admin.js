/**
 * Created by chenjie on 2017/6/28.
 */
var express = require('express');
var router = express.Router();
var json1 = { title: 'Express' ,name: 'chenjie'};
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('admin', json1);
    /*res.send('respond with a resource');*/
});
router.get('/a', function(req, res, next) {
    res.render('a', { title: '/a' ,str: 'aaaaaaaaa'});
    /*res.send('respond with a resource');*/
});
module.exports = router;
