/* ========================================
 *  company : Dilusense
 *   author : Lixj
 *     date : 2019/5/29
 * ======================================== */


const install = (Vue)=>{
  const Bus = new Vue({
    methods:{
      emit(event, ...args){
        console.log("发送事件：",event)
        this.$emit(event, ...args)
      },
      on(event, callback){
        console.log("启用监听：",event)
        this.$on(event, callback)
      },
      off(event,callback){
        console.log("注销监听：",event)
        this.$off(event, callback)
      }
    }
  })
  const msg = {
    RESET_COUNT_NUMBER:'RESET_COUNT_NUMBER',
    MSG_COMPARE_RESULT:'MSG_COMPARE_RESULT',
    COUNT_PASS_NUMBER:'COUNT_PASS_NUMBER',
    COUNT_ALARM_NUMBER:'COUNT_ALARM_NUMBER',
  }
  Vue.prototype.$bus = Bus
  Vue.prototype.$bus_msg = msg
}
export default install