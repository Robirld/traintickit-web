<template>
  <div class="main-panal panel">
    <div class="panel-head">
      <img src="../assets/logo.png" class="logo-img"/>
      <h2>123 TT</h2>
      <p style="text-align: center; color: red; font-size: 1rem;" v-if="msg != null">{{msg}}</p>
    </div>

    <form class="rignt-asign">
      <div class="form-item signup-input">
        <label for="username">账号：</label>
        <input id="username" v-model="username" type="text" class="input-login"/>
        <p style="color: red; font-size: 0.9rem; padding-right: 8rem;" v-if="un1 == false">*账号不能为空</p>
      </div>

      <div class="form-item signup-input">
        <label for="password">密码：</label>
        <input id="password" v-model="password" type="password" class="input-login"/>
        <p style="color: red; font-size: 0.9rem; padding-right: 8rem;" v-if="un2 == false">*密码不能为空</p>
      </div>

      <div class="form-item signup-input">
        <label for="repassword">确认密码：</label>
        <input id="repassword" v-model="repassword" type="password" class="input-login"/>
        <p style="color: red; font-size: 0.9rem; padding-right: 8rem;" v-if="un3 == false">*密码不一致</p>
      </div>

      <div class="form-item signup-input">
        <label for="phone">手机号：</label>
        <input id="phone" v-model="phone_number" type="text" class="input-login"/>
        <p style="color: red; font-size: 0.9rem; padding-right: 8rem;" v-if="un4 == false">*手机号格式不正确</p>
      </div>

      <div class="form-item" style="text-align: center;">
        <a class="btn2 btn-primary2 btn-middle2" style="margin-right: 1rem;" @click="submit">提交</a>
        <a class="btn2 btn-success2 btn-middle2" @click="back">返回</a>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'signUp',
    data () {
      return {
        msg: null,
        un1: true,
        un2: true,
        un3: true,
        un4: true,
        username: '',
        password: '',
        repassword: '',
        phone_number: ''
      }
    },
    methods:{
      submit(){
        if(this.checkInput()){
          this.$ajax({
            method: 'post',
            url: '/signup',
            data: {
              username: this.username,
              password: this.password,
              phone_number: this.phone_number
            }
          }).then(res => {
            if(res.data.code == 200){
              alert("注册成功！");
              this.$router.push('/login');
            }else{
              this.msg = res.data.msg;
            }
          });
        }
      },
      back(){
        this.$router.back(-1);
      },
      checkInput(){
        var res = true;
        if(this.username.trim() === ''){
          this.un1 = false;
          res = false;
        }else{
          this.un1 = true;
        }
        if(this.password.trim() === ''){
          this.un2 = false;
          res = false;
        }else{
          this.un2 = true;
        }
        if(this.password.trim() !== this.repassword.trim()){
          this.un3 = false;
          res = false;
        }else{
          this.un3 = true;
        }
        var phone_number = this.phone_number.trim();
        if(phone_number !== '' && !phone_number.match(/^(\+86)?1[0-9]{10}$/)){
          this.un4 = false;
          res = false;
        }else{
          this.un4 = true;
        }
        return res;
      }
    }
  }
</script>

<style>
  @import url("../assets/css/default.css");
  .panel{
    margin: 3rem auto;
    padding: 2rem 0;
    width: 40rem;
  }

  .signup-input {
    margin-right: 12rem;
  }
</style>
