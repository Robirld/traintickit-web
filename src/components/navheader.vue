<template>
  <div>
    <nav>
      <ul class="nav-ul">
        <li class="nav-li font-weight-bold" :class="index === 0 ? 'seleted' : ''" @click="getUserPage()"><a>{{username}}</a></li>
        <li class="nav-li" :class="index === 1 ? 'seleted' : ''" @click="toHome()"><a>火车票查询</a></li>
        <li class="nav-li" :class="index === 2 ? 'seleted' : ''" @click="toOrder()"><a>订单查询</a></li>
        <li class="nav-li" :class="index === 3 ? 'seleted' : ''" @click="toPassenger()"><a>乘客信息</a></li>
        <li class="nav-li" :class="index === 4 ? 'seleted' : ''" @click="signDown()"><a>注销</a></li>
        <li class="nav-li-1 float-right right-1">
          <span class="message">消息</span>
          <div class="notice message" :class="hasMessage ? 'msg-flag':''">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z"/>
              <path fill-rule="evenodd" d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
            </svg>
          </div>
        </li>
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
        index: this.$store.getters.index,
        hasMessage: false
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
  .message:hover{
    color: #FFFFFF;
    cursor: pointer;
  }
  .notice{
    display: inline-block;
    margin-left: 0.3rem;
    margin-top: -0.15rem;
  }
  .nav-li-1{
    display: inline-flex;
    padding: 0;
    font-size: 1.1rem;
    color: #cccccc;
  }
  .msg-flag:after{
    content: '*';
    color:red;
    font-size: 1rem;
    font-weight: bolder;
  }
</style>
