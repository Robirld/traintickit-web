import StringUtil from '../assets/js/stringUtil'

const dateUtils = {
  dateFormat : function(split, dateTime){
    if(dateTime == null){
      return '--';
    }
    if(split == null){
      split = '/';
    }
    var dt = new Date(Date.parse(dateTime));
    var y = dt.getUTCFullYear();
    var M = StringUtil.formatIntString(2, dt.getUTCMonth() + 1);
    var d = StringUtil.formatIntString(2, dt.getUTCDate());
    var h = StringUtil.formatIntString(2, dt.getUTCHours());
    var m = StringUtil.formatIntString(2, dt.getUTCMinutes());
    var s = StringUtil.formatIntString(2, dt.getUTCSeconds());
    return '' + y + split + M + split + d+' '+ h + ':' + m + ':' + s;
  }
}

export default dateUtils
