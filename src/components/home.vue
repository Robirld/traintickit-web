<template>
  <div>
    <navheader></navheader>
    <form class="form-inline panel-head">
      <div class="form-group">
        <label for="start" class="sr-only">出发城市：</label>
        <input id="start" type="text" class="form-control" v-model="startCity" placeholder="请输入出发城市" />
      </div>
      <div class="form-group" style="margin: 0 1rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
        </svg>
      </div>
      <div class="form-group">
        <label for="end" class="sr-only">目标城市：</label>
        <input id="end" type="text" class="form-control" v-model="endCity" placeholder="请输入目标城市" />
      </div>
      <div class="form-group" style="margin: 0 2rem;">
        <label for="rideDate" class="sr-only">乘车日期：</label>
        <input id="rideDate" type="date" class="form-control" v-model="ride_date"/>
      </div>
      <div class="form-group">
        <a class="btn btn-middle btn-primary" style="margin-right: 1rem;" @click="search()">查找</a>
        <a class="btn btn-middle btn-light" @click="reset()">重置</a>
      </div>
      <div class="form-group" style="margin: 0 1rem;">
        <span v-if="msg != ''" style="color: red;">{{msg}}</span>
      </div>
    </form>

    <div class="panel-head">
      <h4>当天车次</h4>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>车次</th>
            <th>起始站</th>
            <th>到达站</th>
            <th>发车时间</th>
            <th>到达时间</th>
            <th>时长</th>
            <th>车票</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="train in trainList">
            <td>{{train.number}}</td>
            <td>{{train.leaveStation}}</td>
            <td>{{train.arriveStation}}</td>
            <td>{{train.leaveTime}}</td>
            <td>{{train.arriveTime}}</td>
            <td>{{train.spend}}</td>
            <td>
              <ul style="margin: 0;padding: 0;">
                <li class="nav-li">软卧:{{train.soft_berth_num}}, </li>
                <li class="nav-li">硬卧:{{train.hard_berth_num}}, </li>
                <li class="nav-li">硬座:{{train.hard_seat_num}}, </li>
                <li class="nav-li">无座:{{train.stand_num}} </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import StringUtil from '../assets/js/stringUtil'
  export default {
    name: 'home',
    data() {
      return {
        startCity: '',
        endCity: '',
        ride_date: null,
        msg: '',
        trainList: null
      }
    },
    created() {
      this.init();
    },
    methods:{
      init(){
        var today = new Date();
        var y = today.getFullYear();
        var m = StringUtil.formatIntString(2,today.getMonth()+1);
        var d = StringUtil.formatIntString(2,today.getDate());
        this.ride_date = y + '-' + m + '-' + d;
      },
      reset(){
        this.startCity = '';
        this.endCity = '';
        this.init();
      },
      search(){
        if(this.startCity.trim() == ''){
          this.msg = '*出发城市不能为空';
          return;
        }
        if(this.endCity.trim() == ''){
          this.msg = '*目标城市不能为空';
          return;
        }
        if(this.startCity.trim() == this.endCity.trim()){
          this.msg = '*出发城市和目标城市不能相同';
          return;
        }
        if(this.ride_date == null){
          this.msg = '*乘车日期不能为空';
          return;
        }
        this.$ajax({
          method: 'post',
          url: '/train/search',
          data: {
            startCity: this.startCity,
            endCity: this.endCity,
            rideDate: this.ride_date
          }
        }).then(res => {
          if(res.data.code == 200){
            this.trainList = res.data.data;
          }else{
            this.msg = res.data.msg;
          }
        }).catch(e => {
          console.log(e);
        })
      }
    }
  }
</script>

<style>
  @import url("../assets/css/bootstrap.min.css");
</style>
