var readFilePath = require('./readFilePath');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

function isFile(file){
  if(!file) return false;
  var stat = fs.statSync(file);
  return stat && stat.isFile();
}

function loadPatterns () {
  console.log('##')
  var files = readFilePath('./bin/pattern');
  var patterns = {};
  // console.log(files);
  _.each(files, function(file){
    if(isFile(file)){
      var baseName = path.basename(file);
      baseName = baseName.substring(0, baseName.lastIndexOf('.'));
      var pattern = require('./pattern/' + baseName);
      if(pattern){
        pattern.displayName = baseName;
        patterns[baseName] = pattern;
      }
    }
  });
  return patterns;
}

module.exports = loadPatterns;