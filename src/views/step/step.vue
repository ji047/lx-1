<template>
    <div>
        <go-back :title="title1"></go-back>
        <p class="biaoti">业务办理信息</p>
        <p class="biaoti2">今年离校环节总共有 15个环节</p>
        <p class="biaoti2">目前未办理环节 <span class="color1">10</span>，目前已办理环节 <span class="color2">5</span></p>
        <div class="pad20">
            <van-swipe :autoplay="3000" indicator-color="white" class="lbt">
                <van-swipe-item>
                    <div class="lbt-item lbt-1">
                        <p class="lbt-item-title">未办理业务详情</p>
                        <div class="lbt-item-body" v-for="item in list" v-if="item.STATUS == '0'">{{item.STEPNAME}}
                            <van-icon name="question-o" @click="showText(item.STEPNAME)"></van-icon>
                        </div>
                    </div>
                </van-swipe-item>
                <van-swipe-item>
                    <div class="lbt-item lbt-2">
                        <p>已通过业务详情</p>
                        <div v-for="item in list" v-if="item.STATUS == '1'">{{item.STEPNAME}}
                            <van-icon name="question" @click="showText(item.STEPNAME)"></van-icon>
                        </div>
                    </div>
                </van-swipe-item>
                <van-swipe-item>
                    <div class="lbt-item lbt-2">
                        <p>不通过业务详情</p>
                        <div v-for="item in list" v-if="item.STATUS == '2'">{{item.STEPNAME}}
                            <van-icon name="question" @click="showText(item.STEPNAME)"></van-icon>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
    import goBack from '@/components/goBack'

    export default {
        name: "step",
        data() {
            return {
                list: [],
                title1: "离校系统"
            }
        },
        components: {goBack},
        methods: {
            getdata() {
                this.$ajax.post('/record/stdIndex', {studentid: "2015961152310002"})
                    .then(res => {
                        console.log(res)
                        if (res) {
                            /*
                            STATUS
                            "0"   未办理
                            1  已通过
                            2  不通过
                             */
                            // this.text = res.data.config.configvalue
                            this.list = res.data.steps
                        }
                    })
            },
            showText(e) {
                this.$toast(e)
            }
        },
        mounted() {
            this.getdata()
        }
    }
</script>

<style scoped>

</style>