<template>
    <div>
        <p>离校须知信息提示</p>
        <van-button @click="confirm">已读</van-button>
        <van-button @click="read">确认</van-button>
        <div>{{text}}</div>
    </div>
</template>

<script>
    export default {
        name: "notice",
        data() {
            return {
                text: ''
            }
        },
        methods: {
            getdata() {
                this.$ajax.post('/config/findByKey', '')
                    .then(res => {
                        console.log(res)
                        if(res){
                            this.text = res.data.config.configvalue
                        }
                    })
            },
            confirm(){
                this.$ajax.post('/student/save', {readflag:"1",studentid:"2015961152310002"})
                    .then(res => {
                        console.log(res)
                        if(res){
                            // this.text = res.data.config.configvalue
                        }
                    })
            },
            read() {
                this.$router.push({path:'basicInfo'})
            }
        },
        mounted() {
            this.getdata()
        }
    }
</script>

<style scoped>

</style>