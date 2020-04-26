/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/12/26
 * ======================================== */

import ENV from '../environment/env.config'
let vars = {}

const io = require ('socket.io-client')

// vars.io = io(`http://${window.location.hostname}:${ENV.websocket_port}/notification_push`)

// socket 协议
vars.PROTOCOLS = {
  MSG_COLLECTION_START: "MSG_COLLECTION_START",//采集流程开始
  MSG_IDENTITY_INFO: "MSG_IDENTITY_INFO",//身份证信息
  MSG_MODEL_DATA:'MSG_MODEL_DATA',//模型信息
  MSG_PHOTO_DATA:'MSG_PHOTO_DATA',//采集最优帧
  MSG_COMPARE_RESULT:'MSG_COMPARE_RESULT',//识别比对结果
  MSG_PASSER_PERSON_INFO:'MSG_PASSER_PERSON_INFO',//通行人员信息
  MSG_DEVICE_STATUS:'MSG_DEVICE_STATUS', //设备状态
}

export default {
    ...vars
}
