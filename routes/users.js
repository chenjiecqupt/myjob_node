var express = require('express');
var router = express.Router();
var json1 = { title: 'Express' ,str: 'info for users'};
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('test1', json1);
    /*res.send('respond with a resource');*/
});
router.get('/a', function(req, res, next) {
    res.render('a', { title: '/a' ,str: 'aaaaaaaaa'});
    /*res.send('respond with a resource');*/
});
module.exports = router;
