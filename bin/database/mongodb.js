var  mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/parser';

var MongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectID;
//var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
//var  db = new mongodb.Db('mydb', server, {safe:true});
var assert = require('assert');

function DB (opts) {
  opts = opts || {};
  this.url = opts.url || url;
}

DB.prototype = {
    open : function(cb){
      MongoClient.connect(this.url, function(err, db){
        if(err){
          console.log('connect fail : ' + err);
        }else{
          console.log('connect success');
          cb && cb(db);
        }
        //assert.equal(null, err);
      });
    },
    save : function(collection, data, cb){
      this.open(function(db){
        db.collection(collection).insertOne(data, function(err, rtn){
          assert.equal(null, err);
          if(err){
            console.log('insert fail : ' + err);
          }else{
            console.log('insert success');
            console.log("Insert successed in " + collection);
          }
          db.close();
          cb && cb();
        });
      })
    }
}

module.exports = DB;