import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: "",
        role: "",
        roleList: [],
        search_stdInfo: {},
        search_list: [],//点击搜索后得到的列表
        myInfo: {},//学会端登录，我的信息
    },
    getters: {
        token: state => state.token,
        search_list: state => state.search_list,
        search_stdInfo: state => state.search_stdInfo,
        myInfo: state => state.myInfo
    },
    mutations: {
        setResult(state, data) {
            state.search_stdInfo = data
        },
        setResultList(state, data) {//搜索学号结果,点击按钮
            state.search_list = data
        },
        setToken(state, token) {
            console.log(token)
            state.token = token
            Cookies.set('token', token)
        },
        setMyInfo(state, data) {
            console.log(data)
            state.myInfo = data
        }
    },
    actions: {}
})
