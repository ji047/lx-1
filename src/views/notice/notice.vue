<template>
    <div>
        <go-back :title="title1"></go-back>
        <div class="pad20">
            <div class="biaoti1">离校须知</div>
            <div class="text-lxxz" v-html="text"></div>
            <div class="iread" v-if="!showBack">
                <van-checkbox v-model="checked" @click="confirm">我已阅读此离校须知会按要求完成离校手续办理</van-checkbox>
            </div>
            <van-button v-if="showBack" size="large" class="button-bg" @click="goback">返回</van-button>
            <van-button v-if="!showBack" :disabled="!checked" @click="read" size="large" class="button-bg">确认
            </van-button>
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
                checked: false,
                myInfo: this.$store.getters.myInfo,
                showBack: false,//false-不展示返回按钮-
            }
        },
        components: {goBack},
        methods: {
            getdata() {//获取须知信息
                this.$ajax.post('/config/findByKey', '')
                    .then(res => {
                        console.log(res)
                        if (res) {
                            this.text = res.data.config.configvalue
                        }
                    })
            },
            confirm() {
                this.checked = !this.checked
            },
            read() {
                //学生本身未读消息，且勾选已读，方可向后台发送请求
                if (this.checked === true && this.$store.getters.myInfo.readflag == '0') {
                    this.$ajax.post('/student/save', {readflag: "1", studentid: this.$store.getters.myInfo.SDUDENTID})
                        .then(res => {
                            console.log(res)
                            if (res.data.errcode == '0') {
                                this.$router.push({path: 'basicInfo'})
                            }
                        })
                } else {

                }
            },
            goback() {
                this.$router.go(-1)
            }
        },
        mounted() {
            console.log(this.$store.getters.myInfo)
            let flag = this.$store.getters.myInfo.readflag//0-未读须知，1-已读
            if (flag == '1') {//已读，则只展示返回按钮
                this.showBack = true//展示返回按钮,隐藏确认按钮,和勾选框
            } else {//未读，展示勾选框和确认按钮，隐藏返回按钮
                this.showBack = false
                this.checked = false
            }
            this.getdata()
        }
    }
</script>

<style scoped>

</style>