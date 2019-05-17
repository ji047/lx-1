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
                    required
                    @click-right-icon="$toast('提示信息')"
            />

            <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
            />
        </van-cell-group>
        <div style="padding: 10px;">
            <van-button type="info" size="large" class="button-bg" @click="login">
                登陆
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
            login() {
                const _this = this

                if (!this.username.trim()) {
                    this.$toast("请输入用户名")
                    return
                }
                if (!this.password.trim()) {
                    this.$toast("请输入密码")
                    return
                }

                this.$ajax.post('/login', {user_name: this.username, pass_word: this.password}).then(res => {
                    console.log(res.data)
                    /*
                     登陆逻辑
                     存token，role
                      */
                    if (res.data.errcode == '0') {
                        this.$store.commit('setToken', res.data.token)
                        // commit('setRole',res.data.role)
                        //res.data.role.roleid=self就是学生，其他的为老师

                        //根据角色决定路由跳转
                        if (res.data.role.roleid) {
                            this.$ajax.post('/set_role', {roleId: res.data.role.roleid}).then(res => {
                            }).catch(err => {
                                this.$toast(err)
                            })
                        }
                        if (res.data.role.roleid == 'self') {//学生
                            this.$router.push({path: '/basicInfo'})
                        } else {//老师
                            this.$router.push({path: "/glstep"})
                        }
                    } else {
                        this.$toast(res.data.errmsg)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>