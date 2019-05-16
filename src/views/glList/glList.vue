<template>
    <div>
        <go-back :title="title1"></go-back>
        <div class="biaoti">图书馆环节未办理人员详情</div>
        <div class="pad20">
            <div style="text-align: left;">共查询到 <span class="colorTheme">{{list.length}}</span> 条数据</div>
            <div class="result">
                <div class="list-item" v-for="i in list" @click="toDetail(i)">
                    <div class="list-item-left">
                        <div><span>{{i.XH}}</span><span>{{i.XM}}</span></div>
                        <div><span>{{i.DEPTNAME}}</span><span>{{i.CLASSNAME}}</span></div>
                    </div>
                    <van-icon name="arrow"></van-icon>
                </div>
            </div>
            <van-button size="large" class="button-bg">确认</van-button>
        </div>
    </div>
</template>

<script>
    import goBack from '@/components/goBack'

    export default {
        name: "glList",
        data() {
            return {
                title1: "离校系统",
                list: []
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
            getList() {
                this.$ajax.post('/record/queryStudentListByStep', {
                    flag: this.$route.query.flag,
                    planid: this.$route.query.planid,
                    stepid: this.$route.query.stepid
                })
                    .then(res => {
                        console.log(res)
                        this.list = res.data.data.records
                    })
            },
            toDetail(item) {
                this.$router.push({path: "/glListDetail", query: item})
            }
        },
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped>

</style>