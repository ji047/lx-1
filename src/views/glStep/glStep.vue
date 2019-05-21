<template>
    <div>
<!--        <go-back :title="title1"></go-back>-->
        <div style="margin-bottom: 20px;">
            <div class="biaoti">办理环节</div>
            <div class="biaoti2">当前办理环节</div>
            <div style="padding: 10px 20px;">
                <el-select v-model="value" placeholder="请选择" @change="onchange">
                    <el-option
                            v-for="item in selectList"
                            :key="item.STEPID"
                            :label="item.STEPNAME"
                            :value="item.STEPID"
                            :loading="loading">
                    </el-option>
                </el-select>
            </div>
        </div>

        <div style="margin-bottom: 20px;">
            <div class="biaoti">业务办理</div>
            <div class="biaoti2">关键词查询</div>
            <van-search
                    v-model="searchValue"
                    placeholder="请输入学号或姓名"
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
                loading: true,//picker显示加载
                value: '',//下拉框选中的项的  STEPID
                loading: true//下拉框是否显示暂无数据
            }
        },
        components: {
            goBack
        },
        methods: {
            /*获取下拉选项*/
            getSelect() {
                this.loading = true
                this.$ajax.post('/record/teacherIndex', '')
                    .then(res => {
                        this.loading = false
                        this.selectList = res.data.data
                        this.planid = res.data.data[0].PLANID
                    })
            },
            onchange(e) {/*选择下拉框后触发  e is item.STEPID */
                for (let i = 0; i < this.selectList.length; i++) {
                    if (e == this.selectList[i].STEPID) {
                        this.currentSelect = this.selectList[i]
                    }
                }
            },
            onSearch() {/*点击搜索按钮后触发*/
                if (!this.currentSelect.STEPNAME) {
                    this.$toast("请选择办理环节！")
                    return
                }
                if (!this.searchValue) {
                    this.$toast("请输入学号或姓名！")
                    return
                }
                this.$ajax.post('/record/queryStudent', {planid: this.planid, search: this.searchValue, xh: '', xm: ''})
                    .then(res => {
                        if (res.data.data.records.length > 0) {
                            this.$store.commit('setResultList', res.data.data.records)
                            this.$router.push({
                                path: '/glSearchList',
                                query: {
                                    planid: this.planid,
                                    currentStepid: this.currentSelect.STEPID,
                                }
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