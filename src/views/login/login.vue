<template>
    <div>
        <p>登录页</p>
        <van-cell-group>
            <van-field
                    v-model="username"
                    required
                    clearable
                    label="用户名"
                    right-icon="question-o"
                    placeholder="请输入用户名"
                    @click-right-icon="$toast('提示信息')"
            />

            <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
                    error-message="密码错误"
            />
        </van-cell-group>
        <div style="padding: 10px;">
            <van-button type="info" size="large" @click="toIndex">
                登陆
            </van-button>
        </div>
        <div style="padding: 10px;">
            <van-button type="info" size="large" @click="toIndex2">
                管理端-办理环节
            </van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                username: "",
                password: ""
            }
        },
        methods: {
            toIndex() {
                const _this = this
                /*
                登陆逻辑
                 */

                setTimeout(function () {
                    _this.$router.push({path: '/basicInfo'})
                }, 2000)
            },
            toIndex2() {
                this.$router.push({path: "/glstep"})
            }
        }
    }
</script>

<style scoped>

</style>