import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // @是src的别名 vue cli项目特供
    component: () => import('@/views/tabbar'),
    children: [
      {
        path: '', // 为空默认子路由
        name: '',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('@/views/article'),
    props: true// 路由映射 => 开启路由prop传参 路由参数也会传递到props中
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: () => import('@/views/user-profile')
  },
  {
    path: '/my-article', // 我的作品
    name: 'userArticles',
    component: () => import('@/views/user-articles')
  },
  {
    path: '/my-article/collect', // 我的收藏
    name: 'userCollect',
    component: () => import('@/views/user-articles')
  },
  {
    path: '/my-article/history', // 我的历史
    name: 'userHistory',
    component: () => import('@/views/user-articles')
  }
]

const router = new VueRouter({
  routes
})

export default router
