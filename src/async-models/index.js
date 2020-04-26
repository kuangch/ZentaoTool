/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2019/5/8
 * ======================================== */

// vue-model-view 组件
const ModelView = () => import(/* webpackChunkName: "vue_model_view" */ 'vue-model-view')

// xlsx 模块
const Xlsx = () => import(/* webpackChunkName: "XLSX" */ 'xlsx')

export {
    ModelView,
    Xlsx
}