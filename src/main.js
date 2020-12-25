// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import tajax from './tajax'
import store from './store'
import './utils'
import navheader from '@/components/navheader'
import StringUtil from '@/assets/js/stringUtil'

Vue.component('navheader',navheader)

Vue.config.productionTip = false
Vue.prototype.$ajax=tajax

Vue.filter('dateFormat', function(dateTime){
  if(dateTime == null){
    return '--';
  }
  var dt = new Date(Date.parse(dateTime));
  var y = dt.getUTCFullYear();
  var M = StringUtil.formatIntString(2, dt.getUTCMonth() + 1);
  var d = StringUtil.formatIntString(2, dt.getUTCDate());
  var h = StringUtil.formatIntString(2, dt.getUTCHours());
  var m = StringUtil.formatIntString(2, dt.getUTCMinutes());
  var s = StringUtil.formatIntString(2, dt.getUTCSeconds());
  return y+'/'+M+'/'+d+' '+h+':'+m+':'+s;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
