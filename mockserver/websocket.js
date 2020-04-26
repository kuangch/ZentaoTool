/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2019/1/23
 * ======================================== */


// 引入WebSocket模块
var ws = require('nodejs-websocket')

// on就是addListener，添加一个监听事件调用回调函数
// Scream server example:"hi"->"HI!!!",服务器把字母大写
let server = ws.createServer({validProtocols:['push','video']},function(conn){
    console.log('New connection')
    conn.on("text",function(str){
        console.log("Received"+str)
        // conn.sendText(str.toUpperCase()+"!!!") //大写收到的数据
        conn.sendText(str)  //收到直接发回去
    })
    conn.on("close",function(code,reason){
        console.log("connection closed")
    })
    conn.on("error",function(err){
        console.log("handle err")
        console.log(err)
    })

}).listen(9001)

var keys = ["WPA2-PSK-CCMP", "WPS", "ESS","NONE"];
var index = Math.floor((Math.random()*keys.length));
let wifiData=function(){
    var data = {
        "type": "wifi_scan_result",
        "data": []
    }
    for (var i=0;i<Math.floor(Math.random()*10+1);i++){
        data['data'].push({
            "ssid":"dilu"+i,
            "bssid":"dilu_b",
            "key_mgmt":keys[index],
            "signal_level": ""+Math.round(Math.random()*-100)
        })
    }
    return JSON.stringify(data)
};
server.on('connection',function(conn){
    console.log(`new conn, protocol:${conn.protocol}, path: ${conn.path}`)
    setInterval(function(){
        if('push' === conn.protocol)
            conn.readyState && conn.send(wifiData())  //收到直接发回去
    },5000)
})