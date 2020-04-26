<template>
    <div class="container" style="overflow: scroll">
        <div class="container_header" style="margin-top: 3vw">
            <div class="search_box">

                <div class="inquire_box">
                    <div class="inquire_box_word">
                        <span class="vertical_line" style="margin-left:0;"></span>
                        <span title="user" class="label_word">用户名</span>
                    </div>
                    <el-input class="inquire_box_select"  clearable v-model="user"
                              size="small"></el-input>
                </div>
                <div class="inquire_box">
                    <div class="inquire_box_word">
                        <span class="vertical_line" style="margin-left:0;"></span>
                        <span title="pwd" class="label_word">密码</span>
                    </div>
                    <el-input class="inquire_box_select" clearable v-model="pwd"
                              size="small"></el-input>
                </div>

                <div class="inquire_box">
                    <div class="inquire_box_word">
                        <span class="vertical_line" style="margin-left:0;"></span>
                        <span title="projectID" class="label_word">项目ID</span>
                    </div>
                    <el-input class="inquire_box_select" clearable v-model="project_id"
                              size="small"></el-input>
                </div>
                <div class="inquire_box">
                    <div class="inquire_box_word">
                        <span class="vertical_line"></span>
                        <span title="身份证号" class="label_word">模块ID</span>
                    </div>
                    <el-input class="inquire_box_select" clearable v-model="module_id"
                              size="small"></el-input>
                </div>

                <el-button :disabled="!finish" type="primary" @click="upClick" style="margin-left:0.5vw;" class="btn-main position element"
                           size="small">批量导入
                </el-button>
                <button type="primary" @click="personnelFiles" style="margin-left: 0.8vw"
                        class="btn-main small position" size="small">模板下载
                </button>
                <button type="primary" @click="stopCreateTask" style="margin-left: 0.8vw"
                        class="btn-main small position" size="small">{{stop?"不允许导入": "允许导入"}}
                </button>
                <input type="file" title=" " ref="uploadFile" style="width:0px;height: 0px;"/>
            </div>
        </div>

        <div v-show="creatingTask.length" style="margin: 10px 20px">
            <div>已处理：{{creatingTask.length}}，创建成功：{{success}}</div>
            <ul style="margin-top: 10px">
                <li v-for="(item, i) in creatingTask">
                    task:{{item.name}}--->assignedTo:{{item['assignedTo[]']}}--->type:{{item.type}}--->success: {{item.success}}
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import excel from '../../../service/utils/excel';

    let app = require( '../../../application');

    export default {
        name: "config_whitelist",
        data() {
            return {
                user: 'kuangch',
                pwd: '',
                project_id: '',
                module_id: '',
                loading: false,
                stop: false,
                finish: true,
                creatingTask : [],
                successCreateCount : 0
            }
        },

        computed:{

            success(){
                let _this = this;
                let s = 0;
                for(let i in _this.creatingTask){
                    if(_this.creatingTask[i]['success']){
                        s++;
                    }
                }
                return s;
            }

        },

        methods: {
            //模板下载
            personnelFiles() {
                window.location.href = "/task_list.xlsx";
            },

            upClick() {
                var _this = this;
                _this.$refs.uploadFile.click()
                _this.$refs.uploadFile.focus()
            },
            stopCreateTask() {
                this.stop = !this.stop;
            },

            // 时间格式转换
            timeF(timeStr) {

                // 2020年6月19日 8:00 or // 4/24/20
                timeStr = timeStr.split(" ")[0]
                timeStr = timeStr.replace("年","-").replace("月","-").replace("日","")

                let date = new Date(timeStr)

                let dateStr = ""
                    + date.getFullYear()
                    + (date.getMonth()+1 >= 10 ? date.getMonth()+1: "0"+(date.getMonth()+1))
                    + (date.getDate()>= 10 ? date.getDate(): "0" + date.getDate())

                return dateStr

            },

            getTaskList(excelJson){
                let _this = this
                let taskList = [];
                let param = _this.$constants.param;
                excelJson.splice(0, 1);
                for (let item in excelJson) {

                    let obj = {};
                    for (let num in param) {
                        obj[param[num]] = excelJson[item][num];
                        obj['module'] = _this.module_id;
                        obj['pri'] = '2';
                    }

                    if (!obj['assignedTo[]']) {
                        continue
                    }

                    if (!obj['estimate'] || obj['estimate'].split("h")[0] === '0') {
                        continue
                    }else {
                        obj['estimate'] = obj['estimate'].split("h")[0]
                    }

                    if (obj['estStarted']) {
                        obj['estStarted'] = _this.timeF(obj['estStarted'])
                    }
                    if (obj['deadline']) {
                        obj['deadline'] = _this.timeF(obj['deadline'])
                    }

                    if (!obj['type']) {
                        obj['type'] = 'devel';
                    }
                    if (!obj['desc']) {
                        delete obj.desc
                    }
                    taskList.push(obj);
                }
                return taskList;
            },

            // 登录
            login() {
                let _this = this
                return new Promise(function (resolve, reject) {
                    _this.$http.get('/user-logout.json').then((res) => {
                        if (res.data && res.data.status == "success") {
                            _this.$http({
                                method: 'POST',
                                url: '/user-login.json',
                                data: 'account=' + _this.user + '&password=' + _this.pwd,
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                            }).then((res) => {
                                if (res.data && res.data.status == "success") {
                                    resolve()
                                } else {
                                    reject()
                                }
                            }).catch((e) => {
                                console.log(e)
                                reject()
                            })
                        } else {
                            reject()
                        }
                    }).catch((e) => {
                        console.log(e)
                        reject()
                    })
                })
            },

            // 创建任务
            createTask(taskList,index) {

                let _this = this

                return new Promise(function (resolve, reject) {
                    if (index >= taskList.length) {
                        resolve(true)
                        return;
                    }

                    let fd = new FormData()
                    for (let x in taskList[index]) {
                        fd.append(x, taskList[index][x])
                    }

                    _this.$http({
                        method: 'POST',
                        url: '/task-create-' + _this.project_id + '.json',
                        data: fd,
                        headers: {'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'}
                    }).then((res) => {
                        if (res.data && (res.data.result == "success" || res.data.status == "success")) {
                            resolve(false)
                        } else {
                            reject()
                        }
                    }).catch((e) => {
                        console.log(e)
                        reject()
                    })
                })

            }

        },

        mounted() {
            let _this = this;

            excel.readFile4Array({
                file: _this.$refs.uploadFile,
                on: {
                    sheet: function (json) {
                        if (JSON.stringify(_this.$constants.header) === JSON.stringify(json[0])) {

                            let taskList = _this.getTaskList(json)

                            console.log(taskList)

                            let index = 0;
                            _this.login().then(function (success) {
                                _this.creatingTask.splice(0,_this.creatingTask.length)
                                _this.finish = false
                                recycleRequest(taskList,index)
                            }).catch(function (e) {
                                console.log(e)
                                _this.$notice_message({
                                    type: 'error',
                                    content: '登录失败'
                                });
                            })

                            // 递归创建任务
                            function recycleRequest(taskList,index) {
                                if(_this.stop){
                                    return;
                                }

                                let taskCreateResult = taskList[index]
                                _this.createTask(taskList,index).then(function (success) {
                                    if (success) {
                                        _this.$notice_message({type: 'success', content: '创建完成'});
                                        _this.finish = true
                                    } else {
                                        taskCreateResult['success'] = true
                                        _this.creatingTask.unshift(taskCreateResult)
                                        return recycleRequest(taskList,++index)
                                    }

                                }).catch(function (e) {
                                    console.log(e)
                                    taskCreateResult['success'] = false
                                    _this.creatingTask.unshift(taskCreateResult)
                                    _this.$notice_message({
                                        type: 'error',
                                        content: '失败' + (taskList.length - index) + '条，成功' + index + '条'
                                    });
                                    _this.finish = true
                                })
                            }

                        } else {
                            _this.$notice_message({
                                content: '文件与模板格式不一致',
                                type: 'error'
                            });
                        }
                    },
                },
                errors: {
                    badfile: function () {
                        _this.$notice_message({
                            content: '请上传正确excel文件',
                            type: 'error'
                        });
                    },
                    pending: function () {
                        _this.$notice_message({
                            content: '正在处理其他文件',
                            type: 'error'
                        });
                    },
                    failed: function () {
                        _this.$notice_message({
                            content: '文件处理异常',
                            type: 'error'
                        });
                    },
                    large: function () {
                        _this.$notice_message({
                            content: '文件过大',
                            type: 'error'
                        });
                    },
                }
            })
        },

        created: function () {
            this.$constants = {
                param: ["name", "assignedTo[]", "estStarted", "deadline", "estimate", "desc", "type"],
                header: ["名称", "资源名称", "开始时间", "完成时间", "工时", "备注", "类型"]
            };
        }
    }
</script>

<style scoped lang="scss">
    .txt-bg {
        background: linear-gradient(90deg, rgba(0, 134, 234, 0.6) 0%, rgba(0, 134, 234, 0) 100%);
        color: #FFFFFF;
        padding-left: 0.5vw;
        display: block;
        float: left;
    }

    /deep/ .el-table-column--selection .cell {
        text-align: center;
    }

    .txt {
        font-size: 1rem
    }

    /deep/ .el-input__inner {
        background: linear-gradient(90deg, rgba(20, 36, 105, 1) 0%, rgba(10, 54, 123, 1) 100%);
    }

    /deep/ .el-button--primary.is-disabled,
    .el-button--primary.is-disabled:active,
    .el-button--primary.is-disabled:focus,
    .el-button--primary.is-disabled:hover {
        background: linear-gradient(#78B6E5, #6A90D0)
    }

    .iconfont:hover {
        color: #fff;
        cursor: pointer;
    }
</style>
