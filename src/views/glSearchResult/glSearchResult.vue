<template>
    <div>
<!--        <go-back :title="title1"></go-back>-->
        <div class="biaoti">基本信息</div>
        <div class="pad20">
            <div class="name-band">
                <div>
                    <div class="name"><span>{{name}}</span> <img src="@/assets/img/male.png" alt="暂无图片"></div>
                    <div>{{xh}}</div>
                    <div>{{mz}}</div>
                </div>
                <img src="@/assets/img/default-user.png" alt="暂无图片">
            </div>
            <div class="list">
                <div class="list-item"><span class="left-span">学院：</span><span
                        class="right-span">{{stdInfo.DEPTNAME}}</span>
                </div>
                <div class="list-item"><span class="left-span">专业：</span><span
                        class="right-span">{{stdInfo.MAJORNAME}}</span></div>
                <div class="list-item"><span class="left-span">班级：</span><span
                        class="right-span">{{stdInfo.CLASSNAME}}</span></div>
                <!--                <div class="list-item"><span class="left-span">宿舍：</span><span class="right-span">{{stdInfo.}}</span></div>-->
                <div class="list-item"><span class="left-span">年级：</span><span class="right-span">{{stdInfo.NJ}}</span>
                </div>
            </div>
        </div>
        <div class="biaoti">业务办理</div>
        <div style="padding: 0 20px;">
            <div class="radio-title radio-border-bottom">图书馆环节办理：
                <van-radio-group v-model="radio" class="radio-inline">
                    <van-radio name="2">未通过</van-radio>
                    <van-radio name="1">通过</van-radio>
                </van-radio-group>
            </div>
        </div>
        <div style="padding: 0 20px;">
            <div class="radio-title radio-border-bottom">备注：
                <van-cell-group>
                    <van-field v-model="textarea" type="textarea" placeholder="请输入备注"/>
                </van-cell-group>
            </div>
        </div>
        <div class="pad20">
            <van-button size="large" class="button-bg" :disabled="!isEdit" @click="save">确认</van-button>
        </div>
    </div>
</template>

<script>
    import goBack from '@/components/goBack'

    export default {
        name: "glSearchResult",
        data() {
            return {
                title1: "离校系统",
                stdInfo: {},//store中存储的查询学生的信息
                name: "",
                xh: "",
                mz: "",
                radio: '1',//通过/不通过
                textarea: '',//备注
                info: {},//状态信息
                isEdit: false,//false-不能修改，true-能修改
                stepid: ""
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
            getState() {//获取状态
                this.$ajax.post('/record/queryStudentByStep', {
                    studentid: this.stdInfo.STUDENTID,
                    planid: this.$route.query.planid,
                    currentStepid: this.$route.query.currentStepid
                })
                    .then(res => {
                        this.info = res.data.data[0]
                        this.textarea = res.data.data[0].REMARK
                        this.isEdit = res.data.data[0].ischeck
                        this.radio = res.data.data[0].STATUS
                        this.stepid = res.data.data[0].STEPID
                    })
            },
            save() {
                this.$ajax.post('/record/saveStudentByStep', {
                    studentid: this.stdInfo.STUDENTID,
                    stepid: this.$route.query.currentStepid,
                    status: this.radio,
                    remark: this.textarea
                })
                    .then(res => {
                        if (res.data.errcode == '0') {
                            this.$toast("保存成功")
                            let _this = this
                            setTimeout(function () {
                                _this.$router.push({path: '/glstep'})
                            }, 3000)
                        } else {
                            this.$toast(res.data.errmsg)
                        }
                    })
            }
        },
        mounted() {

            this.stdInfo = this.$store.getters.search_stdInfo
            this.name = this.$store.state.search_stdInfo.XM
            this.xh = this.$store.state.search_stdInfo.XH
            this.mz = this.$store.state.search_stdInfo.MZ
            this.getState()
        }
    }
</script>

<style scoped>

</style>