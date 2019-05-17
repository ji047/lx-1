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
            path: '/glStep',
            name: 'glStep',
            component: () => import( './views/glStep/glStep.vue')
        },
        {
            path: '/glSearchList',
            name: 'glSearchList',
            component: () => import( './views/glSearchList/glSearchList.vue')
        },
        {
            path: '/glSearchResult',
            name: 'glSearchResult',
            component: () => import( './views/glSearchResult/glSearchResult.vue')
        },
        {
            path: '/glList',
            name: 'glList',
            component: () => import( './views/glList/glList.vue')
        },
        {
            path: '/glListDetail',
            name: 'glListDetail',
            component: () => import( './views/glListDetail/glListDetail.vue')
        }
    ]
})
