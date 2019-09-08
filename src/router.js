import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/publish',
      children: [
        {
          path: '/publish',
          name: 'publish',
          component: ()=>import('@/views/publish/index')
        },
        {
          path: '/articles',
          name: 'articles',
          component: ()=>import('@/views/articles/index')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('@/views/login/index')
    }
  ]
})
