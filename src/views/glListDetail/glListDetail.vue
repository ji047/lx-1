<template>
    <div>
        <go-back :title="title1"></go-back>
        <div class="biaoti">基本信息</div>
        <div class="pad20">
            <div class="name-band">
                <div>
                    <div class="name">
                        <span>{{item.XM}}</span><img src="@/assets/img/male.png" alt="暂无图片">
                    </div>
                    <div>{{item.XH}}</div>
                    <div>{{item.MZ}}</div>
                </div>
                <img src="@/assets/img/default-user.png" alt="暂无图片">

            </div>
            <div class="list">
                <div class="list-item"><span class="left-span">学院：</span><span
                        class="right-span">{{item.DEPTNAME}}</span>
                </div>
                <div class="list-item"><span class="left-span">专业：</span><span
                        class="right-span">{{item.MAJORNAME}}</span></div>
                <div class="list-item"><span class="left-span">班级：</span><span
                        class="right-span">{{item.CLASSNAME}}</span></div>

                <div class="list-item"><span class="left-span">年级：</span><span class="right-span">{{item.NJ}}</span>
                </div>
                <div class="list-item"><span class="left-span">学制：</span><span class="right-span">{{item.XZ}}</span>
                </div>
                <div class="list-item"><span class="left-span">培养层次：</span><span class="right-span">{{item.PYCC}}</span>
                </div>
                <div class="list-item"><span class="left-span">联系电话：</span><span class="right-span">{{item.LXDH}}</span>
                </div>
                <div class="list-item"><span class="left-span">户籍性质：</span><span class="right-span">{{item.HJXZ}}</span>
                </div>
                <div class="list-item"><span class="left-span">家庭地址：</span><span class="right-span">{{item.JTZZ}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import goBack from '@/components/goBack'

    export default {
        name: "glListDetail",
        data() {
            return {
                title1: "离校系统",
                item: {}
            }
        },
        components: {goBack},
        methods: {},
        mounted() {
            this.item = this.$route.query
        }
    }
</script>

<style scoped>

</style>