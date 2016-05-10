var _ = require('lodash');
module.exports = function process ($, cb) {
  var list = $('.house-lst li');
  var items = [];
  _.each(list, function(item){
    $item = $(item);
    var img = $item.find('.pic-panel img').attr('data-apart-layout');
    $item = $item.find('.info-panel');
    var title = $item.find('h2 a').text();
    var where = $item.find('.where').text();
    var other = $item.find('.other').text();
    var chanquan = $item.find('.chanquan').text();
    var price = $item.find('.price').text();
    var pricePre = $item.find('.price-pre').text();
    var colLook = $item.find('.col-look').text();
    items.push({
      imgsrc : img,
      title : title,
      where : where,
      other : other,
      chanquan : chanquan,
      price : price,
      pricePre : pricePre,
      colLook : colLook
    });
  });
  // console.log()
  // console.log(items);
  // 用数组方式输出内容
  cb && cb(items);
}