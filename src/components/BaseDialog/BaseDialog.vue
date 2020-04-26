<template>

  <div class="dialog-bg" v-show="isShow" >
    <transition name="fade">
      <div v-show="isShow" :class="'dialog-box '+(type==='warning'?' dialog-warning':' dialog-normal')">
        <div class="dialog-box-bg">
          <div class="dialog-title-bg">
            <div class="dialog-title-box">
              <h2 class="dialog-title">
                <span>{{ title }}</span>
                <i class="iconfont icon-icon_quite close" @click="onClose" v-if="showClose"></i>
              </h2>
            </div>
          </div>
          <div class="box-polygon">
            <component :is='content' v-if="isShow" :param="param" :dialog_parent="dialog_parent"></component>
          </div>
        </div>
      </div>

    </transition>
  </div>

</template>

<script>
const baseDialog={
  name: 'BaseDialog',
    data() {
        return {
            isShow:false,
            title:'消息',
            type:'info',
            showClose:false,
            content:null,
            param:'',
            dialog_parent:''
        }
    },
    created:function(){
        var _this = this;
        baseDialog.$eventBus.$on("closeDialog", function () {
            _this.onClose();
        });
        baseDialog.$eventBus.$on("openDialog", function (data) {
            _this.content=data.content;
            _this.title=data.title||'消息';
            _this.showClose=data.showClose!==false;
            _this.isShow=true;
            _this.param=data.param;
            _this.dialog_parent=data.dialog_parent;
            _this.type=data.type||'info';

        });
    },
    methods: {
        onClose:function() {
            this.isShow=false;
        }
    },
    mounted: function () {

    }
}
export default baseDialog;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dialog-bg{
  position:absolute;
  top:0;
  left:0;
  width:100vw;
  height:100vh;
  background-color:rgba(255,255,255,.3);
  justify-content:center;
  align-items:center;
  display:flex;
  z-index: 2001;
}
.dialog-box{
  color:#FFF;
  box-shadow:0px 0px .2vw .1vw #1EB4EF inset;
  border:2px solid #0086EA;
  position: relative;
  background: linear-gradient(to right, #142469 , #0A367B);
}
.box-polygon{
  background: linear-gradient(to right, #142469 , #0A367B);
  -webkit-clip-path: polygon(0 calc(100% - 10px), 10px 100%, calc(100% - 10px) 100%,100% calc(100% - 10px),100% 0,0 0);
  clip-path: polygon(0 calc(100% - 10px), 10px 100%, calc(100% - 10px) 100%,100% calc(100% - 10px),100% 0,0 0);
}
.dialog-title{
  font-size:1.2rem;
  line-height: 3rem;
  position:relative;
  font-weight:bold;
  padding:0 1vw;
  -webkit-clip-path: polygon(0 100%, 100% 100%, 100% 10px,calc(100% - 10px) 0,10px 0,0 10px);
  clip-path: polygon(0 100%, 100% 100%, 100% 10px,calc(100% - 10px) 0,10px 0,0 10px);
}
.dialog-box-bg{
  background:linear-gradient(to bottom, rgba(0,0,0,0) , #1EB4EF);
}
.dialog-normal .dialog-title-bg{
  background:linear-gradient(to bottom, #1EB4EF , rgba(0,0,0,0));
}
.dialog-warning .dialog-title-bg{
  background:linear-gradient(to right, #a86685 , #1EB4EF);
}
.dialog-title-box{
  background: linear-gradient(to right, #142469 , #0A367B);
  -webkit-clip-path: polygon(0 100%, 100% 100%, 100% 10px,calc(100% - 10px) 0,10px 0,0 10px);
  clip-path: polygon(0 100%, 100% 100%, 100% 10px,calc(100% - 10px) 0,10px 0,0 10px);
}
.dialog-normal .dialog-title{
  background: linear-gradient(to right, #0660b4 ,#0A367B);
}
.dialog-warning .dialog-title{
  background: linear-gradient(to right, rgba(248,55,79,0.60) ,rgba(248,55,79,0));
}
.close{
  position: absolute;
  right: 1vw;
  cursor:pointer;
  font-weight:bold;
  font-size:1.8rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.icon-icon_quite{
  color: #9CE3FF;
}
.icon-icon_quite:hover{
  color: #fff;
}
</style>
