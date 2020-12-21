<template>
  <div>
    <nav>
      <ul class="nav-ul">
        <li class="nav-li" :class="index === 0 ? 'seleted' : ''" @click="getUserPage()"><a>{{username}}</a></li>
        <li class="nav-li" :class="index === 1 ? 'seleted' : ''" @click="toHome()"><a>火车票查询</a></li>
        <li class="nav-li" :class="index === 2 ? 'seleted' : ''" @click="toOrder()"><a>订单查询</a></li>
        <li class="nav-li" :class="index === 3 ? 'seleted' : ''" @click="toPassenger()"><a>乘客信息</a></li>
        <li class="nav-li" :class="index === 4 ? 'seleted' : ''" @click="signDown()"><a>注销</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import { getTokenFromCookie, removeToken } from '@/utils/cookie'
  export default {
    name: 'navheader',
    data() {
      return {
        username: Cookies.get('username'),
        index: this.$store.getters.index
      }
    },
    methods:{
      getUserPage(){
        this.$store.commit('setIndex', 0);
        this.$router.push('/userinfo');
      },
      toHome(){
        this.$store.commit('setIndex', 1);
        this.$router.push('/home');
      },
      toOrder(){
        this.$store.commit('setIndex', 2);
        this.$router.push('/order');
      },
      toPassenger(){
        this.$store.commit('setIndex', 3);
        this.$router.push('/passenger');
      },
      signDown(){
        this.$ajax({
          method: 'post',
          url: 'logout',
          data: {}
        }).then(res => {
          if(res.data.code == 200){
            removeToken();
            this.$router.push('/login');
          }else{
            throw new Error('注销失败');
          }
        }).catch(e => {
          console.log(e);
        })
      }
    }
  }
</script>

<style>
  @import url("../assets/css/default.css");
</style>
