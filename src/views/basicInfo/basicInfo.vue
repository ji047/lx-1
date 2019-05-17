<template>
    <div>
        <go-back :title="title1"></go-back>
        <div class="biaoti">基本信息</div>
        <div class="pad20">
            <div class="name-band">
                <div>
                    <div class="name"><span>{{student.xm}}</span> <img src="@/assets/img/male.png" alt="暂无图片"></div>
                    <div>{{student.xh}}</div>
                    <div>{{student.mz}}</div>
                </div>
                <img src="@/assets/img/default-user.png" alt="暂无图片">
            </div>
            <div class="list">
                <div class="list-item"><span class="left-span">学院：</span><span class="right-span">{{student.xy}}</span></div>
                <div class="list-item"><span class="left-span">专业：</span><span class="right-span">{{student.zy}}</span></div>
                <div class="list-item"><span class="left-span">班级：</span><span class="right-span">{{student.bj}}</span></div>
                <div class="list-item"><span class="left-span">宿舍：</span><span class="right-span">{{student.ss}}</span></div>
                <div class="list-item"><span class="left-span">年级：</span><span class="right-span">{{student.nj}}</span></div>
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
                title1: "离校系统",
                student: {}//学生信息
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
                this.$ajax.post('/student/index')
                    .then(res => {
                        console.log(res)
                        this.student = res.data.student
                        if (res.data.student.readflag !== '1') {//0-沒有看须知，1-看了的
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