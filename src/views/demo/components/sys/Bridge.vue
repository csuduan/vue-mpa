<template>

    <router-view ></router-view>
</template>

<script>
    //该组件用来解决三次以上嵌套路由
    export default {
        mounted() {
            console.log("mount monitor")

        }
    }
</script>