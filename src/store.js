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
        search_list: []//点击搜索后得到的列表
    },
    getters: {
        token: state => state.token
    },
    mutations: {
        setResult(state, data) {
            state.search_stdInfo = data
        },
        setResultList(state, data) {//搜索学号结果
            data.search_list = data
        },
        setToken(state, token) {
            state.token = token
            Cookies.set('token', token)
        }
    },
    actions: {}
})
