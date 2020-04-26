<template>
    <div class="content-box" v-loading="loading">
        <p class="message-title">确认是否关机？</p>
        <div class="btn-box">
            <el-button @click="submit" type="primary" class="btn-main position element">确认</el-button>
            <el-button @click="cancel" type="primary" class="btn-main position element">取消</el-button>
        </div>
    </div>
</template>

<script>
    import Login from '../service/api/login'
    let login;
    export default {
        name: "shutdownDialog",
        props: {
            param: Object
        },
        data() {
            return {
                loading: false,
            }
        },
        methods: {
            submit: function () {
                var _this = this;
                _this.loading = true;
                login.shutdown(function (data) {
                    _this.loading = false;
                    if (data.code === 0) {
                        location.href = '/';
                    } else {
                        _this.$codeMessage(data.code, function () {
                            _this.$notice_message({type: 'error', content: '关机失败！'});
                        })

                    }
                    _this.$closeDialog();
                })
            },
            cancel: function () {
                this.$closeDialog();
            }
        },
        mounted: function () {
            login = new Login(this);
        }
    }
</script>

<style scoped lang="scss">
    .content-box {
        padding: 10px;
        color: $color_content_txt;
        .txt-tip {
            margin-top: 10px;
        }
        .btn-ok {
            margin-right: 20px;
        }
        p {
            text-align: center;
            min-width: 430px;
        }

    }
</style>
