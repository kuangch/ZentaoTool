/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/12/26
 * ======================================== */

export default function (Vue) {
  //根据code码弹出对应提示信息
  Vue.$codeMessage = Vue.prototype.$codeMessage = function (code,cb) {
    switch (code){
      case 0:
        Vue.$notice_message({type:'success',content:Vue.const.MSG.SAVE_SUCCEED});
        break;
      case 402:
        Vue.$notice_message({type:'error',content:Vue.const.MSG.REQUEST_ERROR});
        break;
      case 408:
        Vue.$notice_message({type:'error',content:Vue.const.MSG.REQUEST_TIMEOUT});
        break;
      case 600:
        // cancel request
        break;
      case 1000:
        Vue.$notice_message({type:'error',content:Vue.const.MSG.REQUEST_FREQUENT_ERROR});
        break;
      case 1002:
        Vue.$notice_message({type:'error',content:Vue.const.MSG.PERMISSIONS_ERROR});
        break;
      case 1004:
        Vue.$notice_message({type:'error',content:Vue.const.MSG.EXPORT_OVERFLOW});
        break;
      default:
        if(typeof cb === "function"){
          cb();
        }else{
          Vue.$notice_message({type:'error',content:Vue.const.MSG.SAVE_FILED});
        }
    }
  }

}
