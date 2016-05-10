var parse5 = require('parse5');
var http = require('http');
var jquery = require('jquery');
var cheerio = require('cheerio');
var args = require('./bin/args');


var LocalParser = require('./bin/index');
// Fetch the google.com content and obtain it's <body> node
/*var parse5 = require('parse5');

var myTreeAdapter = {
   //Adapter methods...
};

var document = parse5.parse('<div></div>', { treeAdapter: myTreeAdapter });

// var html = parse5.serialize(document, { treeAdapter: myTreeAdapter });
console.log(myTreeAdapter);*/

'use strict';
/*$ = cheerio.load('<h2 class="title">Hello world</h2>');

$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

console.log($('h2').text());
*/

var flags =args.flags;
var defaultSrcFilePath = './files/src';
var localParser = new LocalParser();
console.log(flags.src);
localParser.parse({
  path : flags.src || defaultSrcFilePath,
  patternName : flags.pattern
});
