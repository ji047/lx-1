<template>
    <div>
        <go-back :title="title1"></go-back>
        <div style="margin-bottom: 20px;">
            <div class="biaoti">办理环节</div>
            <div class="biaoti2">当前办理环节</div>
            <div class="pad20">
                <div @click="flag = true" class="picker-click-div">{{text}}</div>
            </div>
            <van-picker
                    show-toolbar
                    title="标题"
                    :columns="columns"
                    @cancel="onCancel"
                    @confirm="onConfirm"
                    v-if="flag"
                    class="picker-position"
                    :loading="loading"
            />
        </div>

        <div style="margin-bottom: 20px;">
            <div class="biaoti">办理环节</div>
            <div class="biaoti2">当前办理环节</div>
            <van-search
                    v-model="searchValue"
                    placeholder="请输入学号搜索"
                    show-action
                    shape="round"
                    @search="onSearch"
            >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
        </div>

        <div style="text-align: left">
            <div class="biaoti">业务办理统计</div>
            <div v-if="currentSelect" style="padding: 10px 20px 20px;">
                <div>已到 <span @click="toSearchList('1')" class="color1">{{currentSelect.YDRS}}</span>人，总人数 <span
                        @click="toSearchList('all')" class="color1">{{currentSelect.ZRS}}</span>人
                </div>
                <div>未到 <span @click="toSearchList('0')" class="color2">{{currentSelect.WDRS}}</span>人，未通过人数 <span
                        @click="toSearchList('no')" class="color2">{{currentSelect.WTGRS}}</span>人
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import goBack from '@/components/goBack'

    export default {
        name: "glStep",
        data() {
            return {
                text: "请选择",
                flag: false,
                title1: "离校系统",
                selectList: [],//下拉选项的数组对象
                columns: [],//下拉选项
                currentSelect: {},//当前选中项
                searchValue: "",
                planid: '',//批次id
                show: false,
                loading: true//picker显示加载
            }
        },
        components: {goBack},
        methods: {
            /*获取下拉选项*/
            getSelect() {
                this.$ajax.post('/record/teacherIndex', '')
                    .then(res => {
                        if (res.data.data) {
                            this.loading = false
                            this.selectList = res.data.data
                            this.planid = res.data.data[0].PLANID
                            for (let i = 0; i < this.selectList.length; i++) {
                                this.columns.push(this.selectList[i].STEPNAME)

                            }
                        }
                    })
            },
            onConfirm(value, index) {
                this.flag = false
                // this.$toast(`当前值：${value}, 当前索引：${index}`);
                this.text = value
                for (let i = 0; i < this.selectList.length; i++) {
                    if (value === this.selectList[i].STEPNAME) {
                        this.currentSelect = this.selectList[i]
                        console.log(this.selectList[i].STEPNAME)
                        console.log(this.currentSelect)
                    }
                }
                // this.$router.push({path: '/glList'})
            },
            onCancel() {
                this.flag = false
                this.$toast('取消');
            },
            onSearch() {
                if (!this.currentSelect) {
                    this.$toast("请选择办理环节！")
                    return
                }
                if (!this.searchValue) {
                    this.$toast("请输入学号！")
                    return
                }
                this.$ajax.post('/record/queryStudent', {planid: this.planid, xh: this.searchValue, xm: ''})
                    .then(res => {
                        if (res.data.data.records.length > 0) {
                            this.$store.commit('setResult', res.data.data.records[0])
                            this.$router.push({
                                path: '/glSearchResult',
                                query: {planid: this.planid, currentStepid: this.currentSelect.STEPID}
                            })
                        } else {
                            this.$toast("暂无数据")
                        }
                    })
            },
            onSelect(item) {
                // 点击选项时默认不会关闭菜单，可以手动关闭
                this.show = false;
                this.$toast(item.name);
            },
            //点击人数，跳转到列表
            toSearchList(flag) {
                this.$router.push({
                    path: "/glList",
                    query: {flag: flag, planid: this.planid, stepid: this.currentSelect.STEPID}
                })
            }
        },
        mounted() {
            this.getSelect()
        }
    }
</script>

<style scoped>

</style>