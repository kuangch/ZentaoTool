/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/11/20
 * ======================================== */
import Vue from 'vue'
import VueRouter from 'vue-router'
import router_child_view from './router_child_view'
import other_fun1 from './other_fun1'
import task_create from './task_create'

const packageJson = require('../../../../package')

var routerList = [{
        path: `/${packageJson.name}/`,
        name: '批量创建任务',
        icon: 'iconfont icon-icon_ssyl',
        component: task_create,
    },{
        path: `/${packageJson.name}/other`,
        name: '其他',
        icon: 'iconfont icon-icon_install',
        component: router_child_view,
        children: [
            {
                path: `/${packageJson.name}/other/fun1`,
                name: '功能1',
                component: other_fun1,
            }
        ]
    },
];
for(let i=0;i<routerList.length;i++){
  if(routerList[i].hidden){
    routerList.splice(i, 1);
    i--;
    continue;
  }
  if(routerList[i].children){
    for(let j=0;j< routerList[i].children.length;j++) {
      if(routerList[i].children[j].hidden){
        routerList[i].children.splice(j, 1);
        j--;
      }
    }
  }
}
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  // base: `${ENV.routerBase}`,
  routes: [
    {
      path: '/',
      redirect: `/${packageJson.name}/`
    },
    ...routerList
  ]
})

/**
 * 校验登录状态
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Vue.$login()) {
      window.location.href = '/'
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})


export default router
export {
  routerList
}

