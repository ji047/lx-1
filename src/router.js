import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('./views/login/login.vue')
        },
        {
            path: '/basicInfo',
            name: 'basicInfo',
            component: () => import('./views/basicInfo/basicInfo.vue')
        },
        {
            path: '/notice',
            name: 'notice',
            component: () => import('./views/notice/notice.vue')
        },
        {
            path: '/step',
            name: 'step',
            component: () => import('./views/step/step.vue')
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})
