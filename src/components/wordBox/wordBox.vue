<template>
  <div class="word-bg">
    <div :class="'word-box box-clip '+(type?type:'')" >
      <div class="word box-clip" :style="width?('width:'+width):'padding:0 .5vw;'">
        {{txt}}
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'word-box',
  props:{
    txt:String,
    type:String,
    width:String,
  },
  data() {
    return {

    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.word-bg{
  background:#1EB4EF;
  color:$color_main_txt;
  line-height: 2rem;
  font-size:1rem;
  display: inline-block;
  .box-clip{
    -webkit-clip-path: polygon(0 calc(100% - 6px), 6px 100%, calc(100% - 6px) 100%,100% calc(100% - 6px),100% 6px,calc(100% - 6px) 0,6px 0,0 6px);
    clip-path: polygon(0 calc(100% - 6px), 6px 100%, calc(100% - 6px) 100%,100% calc(100% - 6px),100% 6px,calc(100% - 6px) 0,6px 0,0 6px);
  }
  .word-box{
    background: linear-gradient(to right, #142469 , #0A367B);
  }
  .word{
    background:rgba(0,134,234,0.40);
    text-align: center;
    min-width:118px;
  }
  .warning{
    .word{
      background:rgba(248,55,79,0.40);
    }
  }
  .success{
    .word{
      background: rgba(29,190,95,0.40);
    }
  }
}

</style>
