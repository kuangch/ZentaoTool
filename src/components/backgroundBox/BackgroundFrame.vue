<template>
    <div class="bg-box">
        <img class="img img-left" :src="defaultImg"/>
        <img class="img img-right" :src="defaultImg"/>
        <img class="img img-bottom-left" :src="defaultImg"/>
        <img class="img img-bottom-right" :src="defaultImg"/>
        <slot name="content_box"></slot>
    </div>
</template>

<script>
    export default {
        name: "backgroundBox",
        data: function () {
            return {
                defaultImg: require('./box_left_angle.svg')
            }
        }
    }
</script>

<style scoped lang="scss">
    .bg-box{
        background:  rgba(0,134,234,0.20);
        position: relative;
        .img{
            width: calc(1vw + 10px);
            height: calc(1vw + 10px);
            position: absolute;
        }
        .img-left {
            left: 0;
            top: 0;
        }

        .img-right {
            right: 0;
            top: 0;
            transform: rotate(90deg);
        }

        .img-bottom-left {
            left: 0;
            bottom: 0;
            transform: rotate(270deg);
        }

        .img-bottom-right {
            right: 0;
            bottom: 0;
            transform: rotate(180deg);
        }
    }
</style>
