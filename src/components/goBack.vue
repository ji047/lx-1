<template>
    <div class="goback-div">
        <van-icon name="arrow-left" @click="goBack"/>
        <div>{{title}}</div>
        <van-icon name="weapp-nav"/>
    </div>
</template>

<script>
    export default {
        name: "goBack",
        props: {
            title: String
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>

</style>