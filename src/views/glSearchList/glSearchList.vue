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
            <!--            <van-button size="large" class="button-bg">确认</van-button>-->
        </div>
    </div>
</template>

<script>
    import goBack from '@/components/goBack'

    export default {
        name: "glSearchList",//点击查询按钮后跳转的列表，可办理
        data() {
            return {
                title1: "离校系统",
                list: [],
                planid: '',
                currentStepid: '',
            }
        },
        components: {goBack},
        methods: {
            getData() {
                console.log(this.$store.getters.search_list)
                this.list = this.$store.getters.search_list
                this.planid = this.$route.query.planid
                this.currentStepid = this.$route.query.currentStepid
            },
            toDetail(item) {
                this.$store.commit('setResult', item)
                this.$router.push({
                    path: "/glSearchResult",
                    query: {
                        planid: this.planid,
                        currentStepid: this.currentStepid,
                    }
                })
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped>

</style>