<template>
  <div id="app">
    <header-view name="管理人员界面" role="admin"></header-view>
    <div class="main">
      <div class="nav-box">
        <div class="wrap-bg">
          <div class="wrap-fg">
            <div class="nav wrap-content">
              <div v-for="(item,index) in routerList" :key="item.name">
                <div v-if="item.children" >
                  <div :class="'nav-menu-item ovfl-ellipsis '+($route.path===item.path||$route.path.indexOf((item.path+'/'))===0?'nav-menu-active':'')"  @click="toggleSubMenu(item,index)">
                    <i :class="item.icon"></i>
                    <span class="">{{item.name}}</span>
                    <i :class="item.showChild?'el-icon-caret-top triangle_up':'el-icon-caret-top triangle_down'"></i>
                  </div>
                  <collapse-transition>
                    <div v-show="item.showChild" >
                      <router-link v-for="child in item.children" :key="child.name" v-if="!child.hidden"
                                   :to="{path: `${child.path}`}">
                        <div :class="'nav-menu-item nav-menu-child ovfl-ellipsis '+($route.path===child.path||$route.path.indexOf((child.path+'/'))===0?'nav-menu-child-active': '')">
                          <span style="margin-left: 2.3vw;">{{child.name}}</span>
                        </div>
                      </router-link>
                    </div>
                  </collapse-transition>

                </div>
                <div v-else>
                  <router-link v-if="!item.hidden" :to="{path: `${item.path}`}">
                    <div :class="'nav-menu-item ovfl-ellipsis '+($route.path===item.path||$route.path.indexOf((item.path+'/'))===0?'nav-menu-active': '')">
                      <i :class="item.icon"></i>
                      <span class="">{{item.name}}</span>
                    </div>
                  </router-link>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="content">
        <router-view class="view"></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  
  const packageJson = require('../../../package')
  import {routerList} from './router'
  import headerView from '../../components/headerView.vue'
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
  export default {
    name: 'app',
    components:{
      headerView,
      CollapseTransition
    },
    data() {
      return {
        packageJson,
        routerList
      }
    },
    methods: {
      toggleSubMenu:function(item,index){
        item.showChild=!item.showChild;
        this.$set(this.routerList, index, item);
      },
      routerChildStatus(){
        for (let i = 0; i < this.routerList.length; i++) {
          if (this.routerList[i].children) {
            for (let j = 0; j < this.routerList[i].children.length; j++) {
              if (this.routerList[i].children[j].path == this.$route.path) {
                this.routerList[i].showChild = true
                break;
              }
            }
          }
        }
      }
    },
    created(){
      this.routerChildStatus()
    },
  }

</script>

<style lang="scss" scoped>
  $nav_max_w: 15vw;
  $nav_min_w:188px;
  $header_content_height: 4rem;
  $interspace:.3vw;

  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    background: linear-gradient(to right, #142469 , #0A367B);
    padding:0 $interspace;
    > .main {
      display: flex;
      overflow:hidden;
      flex: 1;
      .wrap-bg{
        height:calc(100vh - 5rem - 4px - #{$interspace});
      }
      .nav-box{
        flex: 0 0 $nav_max_w;
        color: $color_content_txt;
      }
      .nav {
        height:100%;
        $nav_item_height: 50px;
        /deep/ .el-tooltip {
          outline: none;
        }
        a{
          color: $color_content_txt;
        }
        .nav-menu-item{
          line-height: $nav_item_height;
          padding:0 1vw;
          font-size: calc(1rem + 2px);
          cursor: pointer;
          position:relative;
          >span{
            margin-left:.5vw;
          }
          i {
            vertical-align: middle;
            font-size: calc(1rem + 8px);
          }
          i:last-child{
            position: absolute;
            right: 1vw;
            top: 1rem;
          }
        }
        .nav-menu-item:hover{
          background-color:#0957b6;
        }
        .nav-menu-item.nav-menu-child{
          padding:0 0 0 2vw;
        }
        .nav-menu-item.nav-menu-active {
          background: linear-gradient(to right,#0086EA,#00BBF6);
          color: white!important;
          border-bottom: .5px solid rgba(0,0,0,0);
        }
        .nav-menu-item.nav-menu-child-active{
          background: rgba(0,134,234,0.80);
          color: white!important;
        }
      }
      > .content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left:$interspace*2;
      }
    }
    @media screen and (max-width: 1920px){
      $nav_max_w: 18vw;
      /deep/ .header .head-l,/deep/ .header .head-r,.main .nav-box,/deep/ .content-r{
        flex: 0 0 $nav_max_w;
      }
    }
    @media screen and (max-width: 1320px){
      $nav_max_w: 15vw;
      /deep/ .header .head-l,/deep/ .header .head-r,.main .nav-box,/deep/ .content-r{
        flex: 0 0 $nav_max_w;
        min-width:$nav_min_w;
      }
    }
  }
</style>
