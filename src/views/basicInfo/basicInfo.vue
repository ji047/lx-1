<template>
    <div>
        <go-back :title="title1"></go-back>
        <div class="biaoti">基本信息</div>
        <div class="pad20">
            <div class="name-band">
                <div>
                    <div class="name"><span>张三</span> <img src="@/assets/img/male.png" alt="暂无图片"></div>
                    <div>126737213123</div>
                    <div>汉族</div>
                </div>
                <img src="@/assets/img/default-user.png" alt="暂无图片">
            </div>
            <div class="list">
                <div class="list-item"><span class="left-span">学院：</span><span class="right-span">艺术学院</span></div>
                <div class="list-item"><span class="left-span">专业：</span><span class="right-span">视觉传达设计</span></div>
                <div class="list-item"><span class="left-span">班级：</span><span class="right-span">一班</span></div>
                <div class="list-item"><span class="left-span">宿舍：</span><span class="right-span">南区一栋604</span></div>
                <div class="list-item"><span class="left-span">年级：</span><span class="right-span">2001</span></div>
            </div>
        </div>
        <div class="biaoti">业务办理</div>
        <div class="pad20">
            <div class="my-button" @click="toNotice">
                <span>离校须知</span>
                <van-icon name="arrow"/>
            </div>
            <div class="my-button" @click="toLx">
                <span>离校环节办理</span>
                <van-icon name="arrow"/>
            </div>
        </div>
    </div>
</template>

<script>
    import goBack from '@/components/goBack'

    export default {
        name: "basicInfo",
        data() {
            return {
                title1: "离校系统"
            }
        },
        components: {goBack},
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
                        if (res.data.student.readflag == '2') {//0-沒有看须知，1-看了的
                            this.$router.push({path: '/notice'})
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