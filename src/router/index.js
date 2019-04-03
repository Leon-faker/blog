import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/components/system/home'),
      children: [
        {
          path: '/home/articlelst',
          name: 'articlelst',
          component: () => import('@/components/system/articlelst'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/home/articleType',
          name: 'articleType',
          component: () => import('@/components/system/articleType'),
          meta: {
            requireAuth: true
          }
        },
        {
          //router 隐藏携带参数
          path: 'addArticle',
          name: 'addArticle',
          component: () => import('@/components/system/addarticle'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'updateArticle',
          name: 'updateArticle',
          component: () => import('@/components/system/addarticle'),
          mete: {
            requireAuth: true
          }
        }
      ]
    }
  ]
})
