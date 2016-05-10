// var DB = require('../database/mongodb');
var DB = require('../database/mongodbWithServer');
var _ = require('lodash');

var defaultTables = [
  'ershouhuang',
]
function MongoDb (opts) {
  this.opts = opts || {};
  var _self = this;
  this.db = new DB();
  var tables = _.concat(defaultTables, this.opts.tables);
  _.each(tables, function(v){
    var method = _.upperFirst(v);
    _self[method] = function(data, cb){
      this.save(v, data, cb);
    }
  });
}
MongoDb.prototype = {
  save : function(collection,data, cb){
    this.db.save(collection,data, cb);
  }
}



module.exports = MongoDb;