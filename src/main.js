import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'
import Vant from 'vant'
import ElementUI from 'element-ui'
import Cookies from 'js-cookie'

import 'vant/lib/index.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$ajax = axios;

Vue.use(Vant)
Vue.use(ElementUI)


function hasToken() {
    if (store.getters.token) {
        return true
    } else {
        let token = Cookies.get('token')
        if (token) {
            store.commit('setToken')
            return true
        } else {
            return false
        }
    }
}

router.beforeEach((to, from, next) => {
    // 检测 store中的 token，如果没有，再去cookie中取，如果cookie中没有，就跳转到login，如果token失效，接口返回403，则提示信息并登出
    if (!hasToken()) {
        router.push({path: '/'})
        next()
    } else {
        next()
    }
})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')