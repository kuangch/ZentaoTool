/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2019/3/21
 * ======================================== */

import {Xlsx} from '../../async-models'

const excel = {}

/**
 *  将二维数组保存为excel表格到本地
 * @param arrays   二维数组
 *   格式要求：
 *   [
 *      [name, age],
 *      [张三，10]，
 *      [张四，12]
 *      ...
 *   ]
 * @param fileName 保存文件名，默认当前时间命名
 * @returns {boolean} 成功失败
 */
excel.saveArray2local = function (arrays,cb,fileName=new Date().toISOString() + '.xlsx') {
    if (!(arrays instanceof Array))
           cb(false);

    // xlsx 模块较大，异步加载
    Xlsx().then(function (XLSX) {
        try{
            let workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(
                workbook,
                XLSX.utils.aoa_to_sheet(arrays),
                "sheet1"
            )

            XLSX.writeFile(workbook, fileName)
            cb(true)
        }catch (e){
            cb(false)
        }
    })
}

/**
 * 读取input选择的excel文件
 * @param opts
 *  {
        file: document.getElementById('file'),
        on: {
            sheet: function (json) {
                console.dir(json)
            },
        },
        errors: {
            badfile: function () {
                console.log('非excel文件')
            },
            pending: function () {
                console.log('正在处理其他文件')
            },
            failed: function () {
                console.log('处理异常')
            },
            large: function () {
                console.log('文件过大')
            },
        }
    }
 *  opts.file: [dom node]选取文件的input对象
 *  opts.on.sheet: [Function(data)]返回解析的excel文件的array数组
 *      [
 *          [name, age],
 *          [张三，10]，
 *          [张四，12]
 *      ]
 *   opts.errors.badfile: [Function()]非excel文件回调
 *   opts.errors.pending: [Function()]有未解析完成任务回调
 *   opts.errors.failed: [Function()]解析失败回调
 *   opts.errors.large: [Function()]文件过大超出限制回调
 */
excel.readFile4Array = function(opts) {

    if(!opts) opts = {};
    let nullfunc = function(){};
    if(!opts.errors) opts.errors = {};
    if(!opts.errors.badfile) opts.errors.badfile = nullfunc;
    if(!opts.errors.pending) opts.errors.pending = nullfunc;
    if(!opts.errors.failed) opts.errors.failed = nullfunc;
    if(!opts.errors.large) opts.errors.large = nullfunc;
    if(!opts.on) opts.on = {};
    if(!opts.on.sheet) opts.on.sheet = nullfunc;
    if(!opts.on.wb) opts.on.wb = nullfunc;

    let XLSX
    let last_wb;
    let rABS;
    let pending;

    // xlsx 模块较大，异步加载
    Xlsx().then(function (xlsx) {
        XLSX = xlsx
        rABS = typeof FileReader !== 'undefined' && FileReader.prototype && FileReader.prototype.readAsBinaryString;
        pending = false;

        // 监听input事件
        if(opts.file && opts.file.addEventListener) opts.file.addEventListener('change', handleFile, false);
    })

    // 处理完成后清空以便下次选择相同文件不能触发change
    function finish() {
        opts.file.value =  ''
    }

    function fixdata(data) {
        let o = "", l = 0, w = 10240;
        for(; l<data.byteLength/w; ++l)
            o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
        o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(o.length)));
        return o;
    }

    function to_json(workbook) {
        let result = {};
        workbook.SheetNames.forEach(function(sheetName) {
            let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {raw:false, header:1});
            if(roa.length > 0) result[sheetName] = roa;
        });
        return result;
    }

    function choose_sheet(sheetidx) { process_wb(last_wb, sheetidx); }

    function process_wb(wb, sheetidx) {
        last_wb = wb;
        opts.on.wb(wb, sheetidx);
        let sheet = wb.SheetNames[sheetidx||0];
        let json = to_json(wb)[sheet];
        opts.on.sheet(json, wb.SheetNames, choose_sheet);
        finish()
    }
    function handleFile(e) {
        if('' === opts.file.value){
            return
        }
        if(pending) return opts.errors.pending();
        let files = e.target.files;
        let i,f;
        for (i = 0, f = files[i]; i != files.length; ++i) {
            let reader = new FileReader();
            let name = f.name;
            if (!(name.endsWith('.xlsx') || name.endsWith('.xls'))){
                opts.errors.badfile()
                finish();
                return
            }
            reader.onload = function(e) {
                let data = e.target.result;
                let wb, arr;
                let readtype = {type: rABS ? 'binary' : 'base64' };
                if(!rABS) {
                    arr = fixdata(data);
                    data = btoa(arr);
                }
                function doit() {
                    try {
                        wb = XLSX.read(data, readtype);
                        process_wb(wb);
                    } catch(e) { console.log(e); opts.errors.failed(e); finish();}
                }

                if(e.target.result.length > 1e6) {
                    opts.errors.large(e.target.result.length, function (e) {
                        if (e) doit();
                    });
                    finish();
                }
                else { doit(); }
            };
            if(rABS) reader.readAsBinaryString(f);
            else reader.readAsArrayBuffer(f);
        }
    }

};

export default excel
