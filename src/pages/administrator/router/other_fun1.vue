<template>
<div style="height:100%;width: 100%;overflow-y: auto;" v-loading="loading">
</div>
</template>

<script>
    let config_origin = {};
    let system_parameters;
    export default {
        name: "system_config",
        data() {
            return {
                loading: false,
            }
        },
        methods:{
        },
    }
</script>

<style scoped lang="scss">

</style>
