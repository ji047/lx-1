<template>
    <div>
        <div>基本信息</div>

        <div style="padding: 10px;">
            <van-button type="info" size="large" @click="toNotice">离校须知</van-button>
            <van-button type="info" size="large" style="margin-top: 10px;" @click="toLx">离校环节办理查看</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "basicInfo",
        data() {
            return {}
        },
        methods: {
            toNotice() {
                this.$router.push({path: 'notice'})
            },
            toLx() {
                this.$router.push({path: 'step'})
            },
            getStdInfo() {
                this.$ajax.post('/student/findByXh', {xh: '2015961152310002'})
                    .then(res => {
                        console.log(res)
                        if(res.data.student.readflag == '2'){//0-沒有看须知，1-看了的
                            console.log('12312')
                            this.$router.push({path:'/notice'})
                        }
                    })
            }
        },
        mounted() {
            this.getStdInfo()
        }
    }
</script>

<style scoped>

</style>