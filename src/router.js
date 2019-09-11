import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export let router = new Router({
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
        },
        {
          path: '/programa',
          name: 'programa',
          component: ()=>import('@/views/addPrograma/index')
        },
        {
          path: '/programaManage',
          name: 'programaManage',
          component: ()=>import('@/views/programaManage/index')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('@/views/login/index')
    }
  ]
});

router.beforeEach((to, from, next) => {
  let isLogin = sessionStorage.getItem('flag');
  if(to.name!=='login'){
    if(isLogin){
      next();
    }else{
      next('/login')
    }
  }else{
    if(isLogin){
      next('/publish');
    }else{
      next()
    }
  }
})