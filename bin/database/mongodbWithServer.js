var http=require('http'),
    mongodb = require("mongodb"),
    poolModule = require('generic-pool');
var url = 'mongodb://localhost:27017/parser';
var pool = poolModule.Pool({
    name     : 'mongodb',
    create   : function(callback) {
        mongodb.MongoClient.connect('mongodb://localhost/test', {
            server:{poolSize:1}
        }, function(err,db){
            callback(err,db);
        });
    },
    destroy  : function(db) { db.close(); },
    max      : 10,//根据应用的可能最高并发数设置
    idleTimeoutMillis : 30000,
    log : false 
});

function DB (opts) {
  opts = opts || {};
  this.url = opts.url || url;
}

DB.prototype = {
    open : function(cb){
      pool.acquire(function(err, db) {
        if (err) {
            console.log('connect fail : ' + err);
        } else {
            console.log('insert success');
            cb && cb(db);
        }
      });
    },
    save : function(collection, data, cb){
      this.open(function(db){
        db.collection(collection).insertOne(data, function(err, rtn){
          if(err){
            console.log('insert fail : ' + err);
          }else{
            console.log('insert success');
            console.log("Insert successed in " + collection);
          }
          pool.release(db);
          cb && cb();
        });
      });
    }
}

module.exports = DB;