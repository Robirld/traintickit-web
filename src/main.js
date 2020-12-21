// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import tajax from './tajax'
import store from './store'
import './utils'
import navheader from '@/components/navheader'

Vue.component('navheader',navheader)

Vue.config.productionTip = false
Vue.prototype.$ajax=tajax

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
