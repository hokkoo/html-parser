var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var assert = require('assert');
var parseHtml = require('./parseHtml');
var colors = require('colors');


function isFile(file){
  if(!file) return false;
  var stat = fs.statSync(file);
  return stat && stat.isFile();
}


var parsed = {
  files : [],
  count : 0
};

function parseFiles(files, cb){
  var file = files.pop();
  if(file){
    parseFile(file, function($){
      parsed.files.push(file);
      parsed.count++;
      cb && cb($);
      setTimeout(function(){
        parseFiles(files, cb);
      }, 200);
     /* process.nextTick(function(){
        parseFiles(files, cb);
      });*/
    });
  }else{
    console.log(parsed);
  }
}


function parseFile(file, cb){
  if(isFile(file)){
    readFile(file, function(data){
      console.log('process file : ' + file.toString().cyan);
      console.log('total : ' + parsed.count.toString().cyan);
      var $ = parseHtml(data);
      // console.log($)
      cb && cb($);
    });
  }
}

var defaultReadFileOption = {
  encoding : 'utf8'
}
function readFile(file, cb){
  fs.readFile(file, defaultReadFileOption, function(err, data){
    if(err){
      console.log('readfile error : ' + JSON.stringify(err));
    }else{
      cb && cb(data);
    }
  });
}
module.exports = parseFiles;