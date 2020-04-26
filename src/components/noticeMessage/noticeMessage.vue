<template>
    <div style="position: fixed;width: 100%;height: 100%;pointer-events: none;z-index: 9999;" v-show="visible">
        <div class="message-box">
            <div class="message-bg" :class="visible?'bounce-enter-active':'bounce-leave-active'">
            <div class="message" :title="content">
                <div class="content-style">
                    <img v-show="type!==''" :class="type+' '" :src="type==='success'?successImg:errorImg"/>
                    {{content}}
                </div>
            </div>
        </div>
        </div>

    </div>
</template>

<script>
    let timer=0;
    const noticeMessage = {
        name: "noticeMessage",
        data() {
            return {
                content: '',
                time: 2000,
                visible: false,
                type: '',
                successImg:require('../../assets/icon_right.svg'),
                errorImg:require('../../assets/icon_wrong.svg')
            }
        },
        methods: {
            open() {
                try {
                    clearTimeout(timer);
                    this.visible = true;
                }catch (e) {
                }
                timer = setTimeout(() => {
                    this.visible = false;
                    timer = null;
                }, this.time);
            },
            close(){
                this.visible = false;
                clearTimeout(timer);
            }
        },
        created: function () {
            var _this = this;
            noticeMessage.$eventBus.$on("close_message", function (data) {
                _this.close();
            });
            noticeMessage.$eventBus.$on("notice_message", function (data) {
                _this.content = data.content;
                if (data.time !== undefined && data.time !== '') {
                    _this.time = data.time;
                }
                if (data.type!==undefined && data.type!==''){
                    _this.type = data.type;
                }else {
                    _this.type = '';
                }
                _this.open();
            });
        }
    }
export default noticeMessage;
</script>
<style scoped lang="scss">
    .message-box{
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    .message-bg {
        height: 160px;
        width: 320px;
        background: #00599B;
        border: 2px solid #1EB4EF;
        box-shadow: inset 0 0 8px 0 #1EB4EF;
        .message {
            color: $color_main_txt;
            font-size: 1.5rem;
            height: 160px;
            width: 320px;
            display: flex;
        }
        .content-style {
            justify-content: center;
            align-items: center;
            display: inherit;
            width: 320px;
            .success {
                width: 25px;
                height: 16px;
                padding-right: 10px;
            }

            .error {
                width: 25px;
                height: 23px;
                padding-right: 10px;
            }
        }
    }
    .bounce-enter-active {
        animation: bounce-in .3s;
    }

    .bounce-leave-active {
        animation: bounce-in .3s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0.8);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
