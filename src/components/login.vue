<template>
  <div class="form-group">
    <img src="../assets/logo.png" class="logo-img"/>
    <h2>123 TT</h2>
    <p style="text-align: center; color: red; font-size: 1rem;" v-if="msg != null">{{msg}}</p>
    <form>
      <div class="form-item">
        <label for="username">账号：</label>
        <input type="text" ref="account" class="input-login" v-model="username" id="username" placeholder="请输入账号"/>
      </div>
      <div class="form-item">
        <label for="password">密码：</label>
        <input type="password" ref="password" class="input-login" v-model="password" id="password" placeholder="请输入密码"/>
      </div>
      <div class="form-item">
        <input type="checkbox" v-model="rememberMe" value="true"/><span style="font-size: 1rem;">记住我</span><br />
        <a class="btn2 btn-primary2 btn-login" @click="login">登陆</a><br />
        <a class="btn2 btn-success2 btn-login" @click="signUp">注册</a>
      </div>
    </form>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { getTokenFromCookie, setTokenToCookie, removeToken } from '@/utils/cookie'
export default {
  name: 'login',
  data () {
    return {
      username: null,
      password: null,
      rememberMe: false,
      redirect: undefined,
      msg: null
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.username = Cookies.get('username');
    this.rememberMe = Cookies.get('rememberMe');
  },
  methods: {
    login() {
      this.$ajax({
        method: 'post',
        url: '/login',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        if (res.data.code == 200){
          setTokenToCookie(res.data.msg, this.rememberMe);
          this.$store.commit('setToken', res.data.msg);
          Cookies.set('username', this.username);
          Cookies.set('rememberMe', this.rememberMe);
          this.$router.push({path: this.redirect || '/home'});
        }else {
          this.msg = res.data.msg;
        }
      }).catch(e => {
        console.log(e);
      })
    },
    signUp() {
      this.$router.push('/signUp');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("../assets/css/default.css");
.form-group {
  width: 30rem;
  margin: 10rem auto;
  padding: 2rem;
  border: solid 0.0625rem #42B983;
  border-radius: 1rem;
  text-align: center;
}
.btn-login{
  width: 55%;
  height: 2rem;
  line-height: 2rem;
}
</style>
