/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/10/18
 * ======================================== */

import http from './http'
import ui from './ui'
import login from './login'
import dialog from './dialog'
import constants from './constants'
import handle from './handle'
const Base = {}

Base.install = function (Vue) {
    http(Vue)
    ui(Vue)
    login(Vue)
    dialog(Vue)
    constants(Vue)
    handle(Vue)
}
export default Base