<template>
  <div class="content-box" >
    <ul class="ul-rhombus">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <div class="timer">
      <div class="time">{{dateTime.time}}</div>
      <div>
        <span class="date">{{dateTime.date}}</span>
        <span class="week">{{weeks[dateTime.week]}}</span>
      </div>
    </div>
    <ul class="ul-rhombus reversal">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import util from '../service/utils';
export default {
  name: 'headTimer',
  props:{
    param:Object
  },
  data() {
    return{
      nowDate:new Date(),
      timer:null,
      weeks : ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
    }
  },
  methods: {
    setTimer: function () {
      //this.dateTime = new Date();
      this.timer = setInterval( () => {
        this.nowDate = new Date();
        if(this.nowDate.getHours()===0 && this.nowDate.getMinutes()===0 && this.nowDate.getSeconds()<=5){
          this.$bus.emit(this.$bus_msg.RESET_COUNT_NUMBER);//重置统计人数
        }
      }, 1000)
    }
  },
  computed:{
    dateTime:function () {

      let date_obj = {
        date:util.dateFormatter(this.nowDate,'YY-MM-DD'),
        week:this.nowDate.getDay(),
        time:util.dateFormatter(this.nowDate,'hh:mm')
      }
      return date_obj;
    }
  },
  mounted:function () {
    this.setTimer();
  },
  beforeDestroy: function () {
    clearInterval(this.timer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .content-box{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color:$color_main_txt;
    .ul-rhombus{
      overflow: hidden;
      max-width: 15vw;
      line-height: .8vw;
      height:.8vw;
      min-height:10px;
      li{
        width:3vw;
        height:100%;
        min-width:32px;
        float: left;
      }
      @for $i from 1 through 5 {
        li:nth-child(#{$i}){
          background: rgba(0,134,234,0.20*$i);
        }
      }
    }
    .ul-rhombus:nth-child(1){
      li{
        clip-path: polygon(0 0, 20% 100%, 100% 100%,80% 0);
      }
    }
    .ul-rhombus:nth-child(3){
      li{
        clip-path: polygon(20% 0, 0 100%, 80% 100%,100% 0);
      }

    }
    .reversal{
      transform: rotate(180deg);
    }
    .timer{
      min-width:140px;
      width:9vw;
      text-align: center;
      .time{
        font-size: 2.8rem;
      }
      .date{
        margin-right: 8px;
      }
    }
  }
</style>
