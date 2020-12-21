import router from '@/router'
import store from '@/store'
import { getTokenFromCookie } from './cookie.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/signUp']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start();
  if(getTokenFromCookie()){
    if(to.path === '/login'){
      next({path: '/home'});
    }else{
      next();
    }
  }else {
    if(whiteList.indexOf(to.path) !== -1){
      next();
    }else{
      next(`/login?redirect=${to.fullPath}`);
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
