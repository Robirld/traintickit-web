const StringUtil = {
  formatIntString: function(length, value){
    var s = value + '';
    if(s.length > length){
      return '格式化数字字符串错误：长度超出';
    }
    for(var i = 0; i < length - s.length; i++){
      s = '0' + s;
    }
    return s;
  }
}

export default StringUtil
