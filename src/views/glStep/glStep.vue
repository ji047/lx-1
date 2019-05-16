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
            />
        </div>

        <div style="margin-bottom: 20px;">
            <div class="biaoti">办理环节</div>
            <div class="biaoti2">当前办理环节</div>
            <van-search
                    v-model="searchValue"
                    placeholder="请输入搜索关键词"
                    show-action
                    shape="round"
                    @search="onSearch"
            >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
        </div>

    </div>
</template>

<script>
    import goBack from '@/components/goBack'

    export default {
        name: "glStep",
        data() {
            return {
                text: "adkasdasdas",
                flag: false,
                title1: "离校系统",
                columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
                searchValue: ""
            }
        },
        components: {goBack},
        methods: {
            onConfirm(value, index) {
                this.flag = false
                this.$toast(`当前值：${value}, 当前索引：${index}`);
            },
            onCancel() {
                this.flag = false
                this.$toast('取消');
            },
            onSearch() {

            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>