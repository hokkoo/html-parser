var execFile = require('child_process').execFile;
var args = require('./args');
var flags =args.flags;
var cheerio = require('cheerio');

function  parseHtml (str) {
  var $ = cheerio.load(str);
  return $;
}

module.exports = parseHtml;