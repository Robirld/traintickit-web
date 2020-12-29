<template>
  <div>
    <navheader></navheader>
    <div class="panel-head">
      <div>
        <ul class="text-size-0">
          <li class="d-inline-flex text-size-1 order-li border-right"
              :class="active == 0 ? 'active-li':''" @click="getNoPay()">待支付订单</li>
          <li class="d-inline-flex text-size-1 order-li border-right"
              :class="active == 1 ? 'active-li':''" @click="getCompleted()">已完成订单</li>
          <li class="d-inline-flex text-size-1 order-li border-right"
              :class="active == 2 ? 'active-li':''" @click="getCanceled()">已取消订单</li>
          <li class="d-inline-flex text-size-1 order-li"
              :class="active == 3 ? 'active-li':''" @click="getAll()">全部订单</li>
        </ul>
      </div>
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>订单号</th>
              <th>车次</th>
              <th>起始站</th>
              <th>到达站</th>
              <th>发车时间</th>
              <th>到达时间</th>
              <th>乘车人</th>
              <th>票价</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orderList">
              <td>{{order.id}}</td>
              <td>{{order.train_number}}</td>
              <td>{{order.leave_station_name}}</td>
              <td>{{order.arrive_station_name}}</td>
              <td>{{order.leave_time}}</td>
              <td>{{order.arrive_time}}</td>
              <td>{{order.passenger_name}}</td>
              <td>{{order.price}}元</td>
              <td>
                <span class="btn-span" @click="pay(order.id)">支付</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'order',
    data(){
      return {
        active: 0,
        orderList:[]
      }
    },
    created() {
      this.$store.commit('setIndex', 2);
    },
    methods:{
      getNoPay: function(){
        this.active = 0;
      },
      getCompleted: function(){
        this.active = 1;
      },
      getCanceled: function(){
        this.active = 2;
      },
      getAll: function(){
        this.active = 3;
      }
    }
  }
</script>

<style>
  @import url("../assets/css/bootstrap.min.css");
  @import url("../assets/css/common.css");
  .order-li{
    padding: 0 0.7rem;
    margin: 0.5rem 0;
    color: #333333;
  }
  .order-li:hover{
    cursor: pointer;
    color: #0069D9;
  }
  .active-li{
    color: #0069D9;
    pointer-events: none;
  }
</style>
