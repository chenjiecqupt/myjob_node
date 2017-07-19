/**
 * Created by chenjie on 2017/7/11.
 */
/**
 * mysql连接池模块
 * @author jeri
 * @time  2016.5.24
 */

var mysql=require("mysql");
/**
 * 连接池建立
 * @pool {object}
 */
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
    port: 3306
});

//导出查询相关
var query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};

module.exports=query;