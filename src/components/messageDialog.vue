<template>
  <div class="content-box" >
    <p class="message-title">{{param.message}}</p>
    <p class="txt-tip message-tip" v-if="param.tip">{{param.tip}}</p>
    <div class="btn-box">
      <el-button @click="submit(param.submit)" type="primary" class="btn-main position element" :style="param.cancel?'':'width:268px;'">确认</el-button>
      <el-button @click="cancel(param.cancel)" type="primary" class="btn-main position element" v-if="param.cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'messageDialog',
    props:{
        param:Object
    },
    data() {
        return {

        }
    },
    methods: {

        submit:function (call) {
            this.$closeDialog();
            if(typeof(call) === 'function'){
              call();
            }
        },
        cancel:function (call) {
            this.$closeDialog();
            if(typeof(call)  === 'function'){
              call();
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .content-box{
    padding:10px;
    color:$color_content_txt;
    .txt-tip{
      margin-top:10px;
    }
    .btn-ok{
      margin-right:20px;
    }
    p{
      text-align: center;
      min-width:430px;
    }

  }
</style>
