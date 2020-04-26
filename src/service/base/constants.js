/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/12/26
 * ======================================== */
let vars = {}

vars.INFO = {
  VERSION: 'V0.1'
}
vars.MSG={
  ERROR:'获取数据异常!',
  NOCHANGE:'您的数据没有改变!',
  SAVE_SUCCEED:'操作成功',
  SAVE_FILED:'操作失败',
  REQUEST_ERROR:'网络请求异常',
  REQUEST_TIMEOUT:'网络请求超时',
  PERMISSIONS_ERROR:'权限不足，需要管理员权限',
  EXPORT_FAILED:'导出失败',
  EXPORT_NO_DATA:'暂无数据',
  EXPORT_OVERFLOW:'导出数据不能超过两万条',
  REQUEST_FREQUENT_ERROR:'操作过于频繁'
};
export default function (Vue) {
  Vue.const = Vue.prototype.const = vars

}
