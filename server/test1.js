/**
 * Created by chenjie on 2017/7/6.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'backbone'
});

function Comment() {};
module.exports = Comment;

pool.on('connection', function(connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

pool.getConnection(function(err, connection) {
    Comment.prototype.readComment = function (callback){
        pool.query('SELECT * FROM person', function(err, result) {
            console.log("invoked[readComment]");
            callback(err, result);
        });
    }
});
