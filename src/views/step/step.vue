<template>
    <div>
        <p>业务办理信息</p>
        <p>今年离校环节总共有 15个环节</p>
        <p>目前未办理环节 10</p>
        <p>目前已办理环节 0</p>
        <div>
            <p>未办理业务详情</p>
            <div v-for="item in list" v-if="item.STATUS == '0'">{{item.STEPNAME}}</div>
        </div>
        <div>
            <p>已通过业务详情</p>
            <div v-for="item in list" v-if="item.STATUS == '1'">{{item.STEPNAME}}</div>
        </div>
        <div>
            <p>不通过业务详情</p>
            <div v-for="item in list" v-if="item.STATUS == '2'">{{item.STEPNAME}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "step",
        data() {
            return {
                list: []
            }
        },
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
            }
        },
        mounted() {
            this.getdata()
        }
    }
</script>

<style scoped>

</style>