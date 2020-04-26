/**工具类**/

//日期格式化
const dateFormatter = function (time,format='YY-MM-DD hh:mm:ss') {
    var date = new Date(time);

    var year = date.getFullYear(),
        month = date.getMonth()+1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var preArr = Array.apply(null,Array(10)).map(function(elem, index) {
        return '0'+index;
    });////开个长度为10的数组 格式为 00 01 02 03

    var newTime = format.replace(/YY/g,year)
        .replace(/MM/g,preArr[month]||month)
        .replace(/DD/g,preArr[day]||day)
        .replace(/hh/g,preArr[hour]||hour)
        .replace(/mm/g,preArr[min]||min)
        .replace(/ss/g,preArr[sec]||sec);

    return newTime;
}
//检测参数
const argumentsFmt = function (args) {
    let arg={
        param:'',
        callBack:function () {},
        final:function () {},
    };

    if(args.length==1 && typeof args[0] == 'function'){
        arg.callBack=args[0];
    }else if(args.length==1){
        arg.param=args[0];
    }
    if(args.length==2 && typeof args[1] == 'function'){
        arg.param=args[0];
        arg.callBack=args[1];
    }
    if(args.length==3 && typeof args[1] == 'function' && typeof args[2] == 'function'){
        arg.param=args[0];
        arg.callBack=args[1];
        arg.final=args[2];
    }

    return arg;
}

//获取静态文字信息
const getStaticInfo = function (name) {
    return config.message[name]?config.message[name]:'';
}
// 默认时间
const getDate = function(){
    var date_value = []
    var timestamp= new Date().getTime();
    var timestamp_seven = timestamp - 7*24*60*60*1000
    var time_data = new Date(timestamp);
    var time_data_seven = new Date(timestamp_seven);
    var current_time = time_data.toLocaleDateString().replace(/\//g, "-") + " " + time_data.toTimeString().substr(0, 8)
    var current_time_seven = time_data_seven.toLocaleDateString().replace(/\//g, "-") + " " + time_data_seven.toTimeString().substr(0, 8)
    return date_value = [current_time_seven ,current_time]
}
//比较不同的数组或者其他对象
const compareDifference  = (() => {
    function compareArray(endvalue, startvalue) {
        if (endvalue.length !== startvalue.length) {
            return false;
        }
        const length = endvalue.length;
        for (let i = 0; i < length; i++) {
            if (!compare(endvalue[i], startvalue[i])) {
                return false;
            }
        }
        return true;
    }

    function compareObject(endvalue, startvalue) {
        const keya = Object.keys(endvalue);
        const keyb = Object.keys(startvalue);
        if (keya.length !== keyb.length) {
            return false;
        }
        return keya.every(key => {
            if (!compare(endvalue[key], startvalue[key])) {
                return false;
            }
            return true;
        });
    }

    function compare(endvalue, startvalue) {
        if (endvalue === startvalue) {
            return true;
        }
        if (typeof endvalue !== typeof startvalue || endvalue === null || startvalue === null) {
            return false;
        }
        if (Array.isArray(endvalue)) {
            if (!Array.isArray(startvalue)) {
                return false;
            }
            return compareArray(endvalue, startvalue);
        }
        if (typeof endvalue === "object") {
            return compareObject(endvalue, startvalue);
        }
        return false;
    }
    return compare;
})();

export default {
    argumentsFmt:argumentsFmt,
    dateFormatter:dateFormatter,
    compareDifference:compareDifference,
    getDate:getDate
}