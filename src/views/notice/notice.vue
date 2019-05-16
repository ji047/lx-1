<template>
    <div>
        <go-back :title="title1"></go-back>
        <div class="pad20">
            <div class="biaoti1">离校须知</div>
            <div class="text-lxxz" v-html="text"></div>
            <div class="iread">
                <van-checkbox v-model="checked" @click="confirm">我已阅读此离校须知会按要求完成离校手续办理</van-checkbox>
            </div>
            <van-button @click="read" size="large" class="button-bg">确认</van-button>
        </div>
<!--        <van-button @click="confirm">已读</van-button>-->
<!--        <van-button @click="read">确认</van-button>-->
    </div>
</template>

<script>
    import goBack from '@/components/goBack'

    export default {
        name: "notice",
        data() {
            return {
                title1: "离校系统",
                text: '',
                checked: false
            }
        },
        components: {goBack},
        methods: {
            getdata() {
                this.$ajax.post('/config/findByKey', '')
                    .then(res => {
                        console.log(res)
                        if (res) {
                            this.text = res.data.config.configvalue
                        }
                    })
            },
            confirm() {
                if(this.checked === true){
                    this.$ajax.post('/student/save', {readflag: "1", studentid: "2015961152310002"})
                        .then(res => {
                            console.log(res)
                            if (res) {
                                // this.text = res.data.config.configvalue
                            }
                        })
                }
            },
            read() {
                this.$router.push({path: 'basicInfo'})
            }
        },
        mounted() {
            this.getdata()
        },
        computed() {

        }
    }
</script>

<style scoped>

</style>