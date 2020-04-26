<template>
  <div class="header">
    <div class="head-l">
      <div class="logo-box head-bg-box">
        <div class="logo head-bg-content">
          <img src="../assets/logo.svg"/>
          <span>禅道工具</span>
        </div>
      </div>
    </div>
    <div class="head-c">
      <!--<word-box :txt="name" class="txt"></word-box>-->
      <!--<head-timer></head-timer>-->
    </div>
  </div>
</template>

<script>
  import headTimer from '../components/headTimer'
  import passwordDialog from '../components/passwordDialog.vue'
  import logoutDialog from '../components/logoutDialog.vue'
  import shutdownDialog from '../components/shutdownDialog.vue'
export default {
  name: 'headerView',
  props:{
    name:{
      type:String,
      default:'远程值守人员界面'
    },
    role:{
      type:String,
      default:'custom'
    },
  },
  components:{
    headTimer
  },
  data() {
    return{

    }
  },
  methods: {
    exit: function () {
      var _this = this;
      _this.$openDialog({
        title:'登出',
        content:logoutDialog,
      })


    },
    modifyPWD:function () {
      this.$openDialog({
        title:'修改密码',
        param:{
          role:this.role,
        },
        content:passwordDialog
      })
    },
    shutdown: function () {
      this.$openDialog({
        title:'关机',
        content:shutdownDialog
      })
    }
  },
  mounted:function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $nav_max_w: 15vw;
  $nav_min_w:188px;
  $header_content_height: 4rem;
  $interspace:.3vw;
  .header {
    flex-basis: 5rem;
    min-height:5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: $color_main_txt;
    .head-l,.head-c,.head-r{
      height:100%;
      flex: 0 0 $nav_max_w;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .head-bg-box{
      border-left:2px solid #1EB4EF;
      border-right:2px solid #1EB4EF;
      width: 100%;
      .head-bg-content{
        height: $header_content_height;
        margin: .2rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: linear-gradient(-90deg, rgba(0,134,234,0.40) 0%, rgba(0,134,234,0.00) 50%,rgba(0,134,234,0.00) 50%,rgba(0,134,234,0.40) 99%);
        .button{
          margin:0 .5vw;
        }
      }
    }
    .head-l{
      .logo{
        span{
          font-size: 1.6rem;
          font-weight: 600;
          margin-left: .5vw;
        }
      }
      img {
        height: $header_content_height - 1.5;
      }
    }
    .head-c{
      flex: 1;
      position: relative;
      margin-left:$interspace*2;
      .txt{
        font-size: 1.2rem;
        line-height: 2.4rem;
        position: absolute;
        left: $interspace*2;
        margin-right:3vw;
        top:1rem;
      }
    }
    @media screen and (max-width: 1920px){
      $nav_max_w: 18vw;
      .head-l,.head-r{
        flex: 0 0 $nav_max_w;
      }
    }
    @media screen and (max-width: 1522px){
      .btn-main{
        margin:0;
      }
    }
    @media screen and (max-width: 1320px){
      $nav_max_w: 15vw;
      .head-l,.head-r{
        flex: 0 0 $nav_max_w;
        min-width:$nav_min_w;
      }
      .head-l .logo-box {
        .logo {
          span {
            font-size: 1.2rem;
          }
          img{
            height:2.2rem;
          }
        }
      }

      .head-r{
        .head-bg-box .head-bg-content{
          .button{
            margin:0;
            padding:8px 12px;
          }
        }
      }
      .head-c {
        /deep/ .ul-rhombus li:nth-child(2n) {
          display: none;
        }
        .txt{
          font-size:1rem;
        }
        /deep/ .timer .time{
          font-size: 2rem;
        }
      }
    }
    @media screen and (max-width: 1080px){
      .head-c {
        justify-content:start;
        .txt{
          position:static;
        }
      }
    }
  }
</style>
