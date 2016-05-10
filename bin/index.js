var readFilePath = require('./readFilePath');
var parseFiles = require('./parseFile');
var loadPatterns = require('./loadPatterns');
var _ = require('lodash');
var SaveStrategyMongodb = require('./saveStrategy/mongodb')
var fileExtension = require('file-extension');

var patterns = loadPatterns();
var availableExtension = ['.html', '.htm', '.txt'];

function Parser (opts) {
  this.opts = opts || {};
  this.patterns = patterns;
  this.saveStrategies = {};
  console.log(patterns);
  this.saveStrategy = new SaveStrategyMongodb();
}

Parser.prototype = {
  setPatten : function(pattern){
    this.pattern = pattern;
  },
  getPattern : function(name){
    var pattern = this.patterns[name];
    var _self = this;
    if(!pattern){
      if(this.pattern){
        return this.pattern;
      }
      var keys = Object.keys(this.patterns);
      _.each(keys, function(key){
        if(pattern = _self.patterns[key]){
          return pattern;
        }
      });
    }
    return pattern;
  },
  getSaveStrategy : function(name){
    var saveStrategy = this.saveStrategies[name];
    var _self = this;
    if(!saveStrategy){
      if(this.saveStrategy){
        return this.saveStrategy;
      }
      var keys = Object.keys(this.saveStrategies);
      _.each(keys, function(key){
        if(saveStrategy = _self.saveStrategies[key]){
          return saveStrategy;
        }
      });
    }
    return saveStrategy;
  },
  setSaveStrategy : function(saveStrategy){
    this.saveStrategy = saveStrategy;
  },
  parse : function(opts, cb){
    opts = opts || {};
    // return;
    var _self = this;
    var files = readFilePath(opts.path, availableExtension);
    var pattern = this.getPattern(opts.patternName);
    var saveStrategy = this.getSaveStrategy();
    // console.log(pattern)
    if(pattern){
      console.log(pattern.displayName);
      parseFiles(files, function($){
        // console.log($)
        pattern($, function(datas){
          _.each(datas, function(data){
            // console.log(data)
            if(saveStrategy){
              saveStrategy.save(pattern.displayName, data);
            }
          });
        });
      });
    }
  }
}

module.exports = Parser;




