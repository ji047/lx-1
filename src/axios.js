import Vue from "vue";
import axios from 'axios';
import qs from 'querystring'
import router from "./router";
import store from './store';
import {Toast, Loading} from 'vant';

//创建实例 axios.create([config])
const instance = axios.create({
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    baseURL: process.env.NODE_ENV === 'production' ? '' : '/proxy',
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    timeout: 50000,
    // `headers` 是即将被发送的自定义请求头
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: ''
    });
    if (config.method === "post") {// post传参序列化
        config.data = qs.stringify(config.data);// 注：若是提交能直接接受json 格式,即可以不用 qs 序列化
    }
    // 判断是否存在token，如果存在将每个页面header都添加token
    if (store.getters.token) {
        console.log(store.getters.token)
        config.headers.Authorization = "Bearer " + store.getters.token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (res) {
    // 对响应数据做点什么
    Toast.clear()
    if (res.data.errcode != '0') {//非正常
        Toast(res.data.errmsg)
        switch (res.data.errcode) {
            case '403':
                router.push('/')
                break;
        }
    }
    return res
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


// //请求拦截器
// instance.interceptors.request.use(
//     config => {
//         //在发送请求之前做些什么
//         if (config.method === "post") {// post传参序列化
//             config.data = qs.stringify(config.data);// 注：若是提交能直接接受json 格式,即可以不用 qs 序列化
//         }
//         // 判断是否存在token，如果存在将每个页面header都添加token
//         if (store.getters.token !== '') {
//             config.headers.Authorization = "Bearer " + store.getters.token;
//         }
//         return config;
//     },
//     error => {
//         //对错误请求做些什么
//         // loading=Vue.prototype.$loading({text:"",background: 'rgba(0, 0, 0, 0.3)'});
//         // Vue.prototype.$message.info('加载超时');
//         return Promise.reject(error);
//     });
// //响应拦截器（返回状态判断）
// instance.interceptors.response.use(
//     res => {
//         return res
//         Vue.prototype.$loading;
//         // loading.close();
//         if (res.data.errcode !== '0') {//非正常
//             Vue.prototype.$toast(res.data.errmsg)
//             // switch (res.data.errcode) {
//             //     case '500':Vue.prototype.$message.error(res.data.errmsg);break;
//             //     case '-1':router.push('/error');break;
//             //     default :Vue.prototype.$message.error(res.data.errmsg);
//             // }
//         } else {
//             Vue.$toast('123!!!')
//             return res;
//         }
//     },
//     err => {
//         // loading.close();
//         // if (err.response) {
//         //     switch (err.response.status) {
//         //         case 403:
//         //             router.replace({
//         //                 path: '/loading',
//         //                 //query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
//         //             });break;
//         //         case 400:
//         //             Vue.prototype.$message.error(err.response);
//         //             router.push('/error')
//         //     }
//         // }
//         Vue.prototype.$toast(err)
//         return Promise.reject(err)
//     });
export default instance;

