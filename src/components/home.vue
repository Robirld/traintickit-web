<template>
  <div>
    <navheader></navheader>
    <div>
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
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="train in trainList">
              <td>
                <span class="btn-a" @click="getTimeTable(train)">{{train.number}}</span>
              </td>
              <td>{{train.leaveStation.name}}</td>
              <td>{{train.arriveStation.name}}</td>
              <td>{{train.leaveTime | dateFormat}}</td>
              <td>{{train.arriveTime | dateFormat}}</td>
              <td>{{train.spend.day}}D {{train.spend.hour}}:{{train.spend.minute}}:{{train.spend.second}}</td>
              <td>
                {{train.ticketAmount}}张
              </td>
              <td>
                <span class="btn-span" @click="book(train)">预订</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="down-panel" v-if="showTT">
      <div class="timeTablePanel text-center">
        <span class="close close-pad" @click="closeDP('timeTable')">x</span>
        <div class="panel-head">
          <h5>车次：{{selectTrain.number}}</h5>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>车站</th>
              <th>到达时间</th>
              <th>开车时间</th>
              <th>停车时长</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in selectTrain.timeTables">
              <td>{{item.station.name}}</td>
              <td>{{item.arrive_time | dateFormat}}</td>
              <td>{{item.leave_time | dateFormat}}</td>
              <td>
                {{item.wait_time/60}}分钟
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="down-panel" v-if="bookTrain != null">
      <div class="timeTablePanel text-center">
        <span class="close close-pad" @click="closeDP('book')">x</span>
        <div class="panel-head">
          <h5>预定车票</h5>
        </div>
        <div class="border-top text-left main">
          <div class="form-group left-25">
            <label for="number" class="control-label">车次：</label>
            <input id="number" class="border-0" :value="bookTrain.number" disabled="disabled" />
          </div>
          <div class="form-group left-25">
            <label for="leaveStation" class="control-label">出发车站：</label>
            <input id="leaveStation" class="border-0" :value="bookTrain.leaveStation.name" disabled="disabled" />
          </div>
          <div class="form-group left-25">
            <label for="arriveStation" class="control-label">目标车站：</label>
            <input id="arriveStation" class="border-0" :value="bookTrain.arriveStation.name" disabled="disabled" />
          </div>
          <div class="form-group left-25">
            <label for="leaveTime" class="control-label">发车时间：</label>
            <input id="leaveTime" class="border-0" :value="bookTrain.leaveTime | dateFormat" disabled="disabled" />
          </div>
          <div class="form-group left-25">
            <label for="arriveTime" class="control-label">到达时间：</label>
            <input id="arriveTime" class="border-0" :value="bookTrain.arriveTime | dateFormat" disabled="disabled" />
          </div>
          <div class="form-group left-25">
            <label for="spend" class="control-label">时长：</label>
            <span id="spend">{{bookTrain.spend.day}}D {{bookTrain.spend.hour}}:{{bookTrain.spend.minute}}:{{bookTrain.spend.second}}</span>
          </div>
          <div class="form-group left-25">
            <label for="passenger" class="control-label">选择乘客：</label>
            <select id="passenger" class="border-secondary" v-model="passenger">
              <option value="-1">姓名-身份证号-手机号</option>
              <option v-for="p in passengers" :value="p">{{p.name}}-{{p.id_num}}-{{p.phone}}</option>
            </select>
            <button class="btn-span">新增乘客</button>
          </div>
          <div class="form-group left-25">
            <label for="price" class="control-label">票价：</label>
            <span id="price">软座-100, 硬座-50</span>
          </div>
          <div class="text-center">
            <span class="btn btn-sm btn-primary" @click="submitOrder()">提交</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import StringUtil from '../assets/js/stringUtil'
  import { removeToken } from '@/utils/cookie'
  export default {
    name: 'home',
    data() {
      return {
        startCity: '',
        endCity: '',
        ride_date: null,
        msg: '',
        trainList: null,
        selectTrain:{},
        showTT: false,
        bookTrain:null,
        passengers:null,
        passenger:-1
      }
    },
    created() {
      this.init();
    },
    methods:{
      submitOrder(){
        if(this.bookTrain == null){
          alert("请选择车次");
          return;
        }
        if(this.passenger == null || this.passenger == -1){
          alert("请选择乘客");
          return;
        }
        this.$ajax({
          method: 'post',
          url: '/order/upload',
          data: {
            bookTrain: this.bookTrain,
            passenger: this.passenger
          }
        }).then(res => {
          if(res.data.code == 200){
            this.passengers = res.data.data;
          }else if(res.data.code == 401){
            removeToken();
            this.$router.push('/login');
          }else{
            alert(res.data.msg);
          }
        }).catch(e => {
          console.log(e);
        });
      },
      getPassengers(){
        this.$ajax({
          method: 'post',
          url: '/passenger/list',
          data: null
        }).then(res => {
          if(res.data.code == 200){
            this.passengers = res.data.data;
          }else if(res.data.code == 401){
            removeToken();
            this.$router.push('/login');
          }else{
            alert(res.data.msg);
          }
        }).catch(e => {
          console.log(e);
        });
      },
      book(ctrain){
        this.bookTrain = ctrain;
        this.getPassengers();
      },
      closeDP(element){
        if(element === 'timeTable'){
          this.showTT=false;
          this.selectTrain = {};
        }
        if(element === 'book'){
          this.bookTrain = null;
          this.passengers = null;
        }
      },
      getTimeTable(ctrain){
        this.showTT=true;
        this.selectTrain = ctrain;
      },
      init(){
        var today = new Date();
        var y = today.getFullYear();
        var m = StringUtil.formatIntString(2,today.getMonth()+1);
        var d = StringUtil.formatIntString(2,today.getDate());
        this.ride_date = y + '-' + m + '-' + d;
      },
      reset(){
        this.msg = '';
        this.startCity = '';
        this.endCity = '';
        this.trainList = null;
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
            this.msg = '';
            this.trainList = res.data.data;
          }else if(res.data.code == 401){
            removeToken();
            this.$router.push('/login');
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
  @import url("../assets/css/common.css");
</style>
