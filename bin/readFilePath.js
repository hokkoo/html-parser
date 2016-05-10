var dirTree = require('directory-tree');
var path = require('path');
var fs = require('fs');
var args = require('./args');
var util = require('util');
var _ = require('lodash');

var flags =args.flags;

function readFilePath (file, filepath) {
  file = file || '';
  filepath = filepath || '';
  filepath = path.resolve(filepath, file);
  var stat = fs.statSync(filepath);
  if(stat){
    return filepath;
  }
}

function flatternPath(tree, filepath, filepaths){
  filepath = filepath || '';
  filepaths = filepaths || [];
  filepath = readFilePath(tree.path, filepath);
  if(filepath){
    filepaths.push(path.normalize(filepath));
    if(tree.children && tree.children.length){
      filepath = tree.path;
      _.each(tree.children, function (v) {
        flatternPath(v, filepath, filepaths);
      });
    }
  }
  return filepaths;
}


function readFilePaths(srcFilePath, validExtension){
  var srcFilePath = path.resolve(srcFilePath);
  // console.log(srcFilePath);
  var srcTree = dirTree(srcFilePath, validExtension) || {};
  var srcPaths = flatternPath(srcTree);
  return srcPaths;
}

module.exports = readFilePaths;