/**
 * Created by chenjie on 2017/7/11.
 */
var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('angular',{title:'angular'});
});

module.exports = router;