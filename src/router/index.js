import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import signUp from '@/components/signUp'
import home from '@/components/home'
import userinfo from '@/components/userinfo'
import order from '@/components/order'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: userinfo
    },
    {
      path: '/order',
      name: 'order',
      component: order
    }
  ]
})
