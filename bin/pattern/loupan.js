var _ = require('lodash');
module.exports = function process ($, cb) {
  var list = $('.house-lst li');
  var items = [];
  _.each(list, function(item){
    $item = $(item);
    $item = $item.find('.info-panel');
    var title = $item.find('h2 a').text();
    var where = $item.find('.where').text();
    var area = $item.find('.area').text();
    var areaSize = $item.find('.area span').text();
    var other = $item.find('.other').text();
    var type = $item.find('.type').text();
    var chanquan = $item.find('.chanquan').text();
    var price = $item.find('.price').text();
    var averagePrice = $item.find('.average').text();
    var tehuiInfoContent = $item.find('.tehui-info-content').text();
    var tehuiTop = $item.find('.tehui-top').text();
    var tehuiNum = $item.find('.tehui-num').text();
    var huxing = [];
    var huxings = $item.find('.huxing-picture-content li');
    _.each(huxings, function(item){
      var $item = $(item);
      huxing.push({
        imgsrc : $item.find('a').attr('data-original'),
        title : $item.find('a').attr('title')
      });
    });

    items.push({
      title : title,
      where : where,
      area : area,
      areaSize : areaSize,
      other : other,
      type : type,
      chanquan : chanquan,
      price : price,
      averagePrice : averagePrice,
      tehuiInfoContent : tehuiInfoContent,
      tehuiTop : tehuiTop,
      tehuiNum : tehuiNum,
      huxing : huxing
    });
  });
  // console.log()
  // console.log(items);
  // 用数组方式输出内容
  cb && cb(items);
}