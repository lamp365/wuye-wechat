import { Config } from 'config.js';

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
* 时间戳转化为年 月 日 时 分 秒 
* number: 传入时间戳 
* format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTime(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

/**
 * 替换富文本编辑器中的src 属性
 * @param {*} content 
 */
function imageUrlReplace(content){
  var result = content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match,capture) {
    //console.log(capture);
    return '<img src="'+ Config.baseUrl+capture+'" style="max-width:100%;height:auto;display:block;margin:10px 0;" />';
  });
  return result;
}
//图片自适应
function imageToFull(content){
  // var result = content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
  var result = content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match,capture) {
    //console.log(capture);
    return '<img src="'+capture+'" style="max-width:100%;height:auto;display:block;margin:10px 0;" />';
  });
  return result;
}

 //验证电话号码
 function _isPhoneNumber(val){
  var isMobilePhone = /^1[3456789]\d{9}$/;
  if(isMobilePhone.test(val)){
    return true;
  }else{
    return false;
  }
}


module.exports = {
  formatTime:formatTime,
  imageUrlReplace:imageUrlReplace,
  imageToFull:imageToFull,
  _isPhoneNumber:_isPhoneNumber
}
