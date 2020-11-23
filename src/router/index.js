import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'
import { layout } from '../config/config'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home-4-line',
      affix: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/indexnew'),
        meta: {
          title: '首页',
          icon: 'home-4-line',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/users',
    component: Layout,
    redirect: '/users/users',
    meta: {
      title: '用户',
      icon: 'user-5-line',
    },
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/users'),
        meta: {
          title: '用户',
          icon: 'user-5-line',
        },
      },
    ],
  },
  {
    path: '/treehole',
    component: Layout,
    redirect: '/treehole/treehole',
    meta: {
      title: '树洞',
      icon: 'folder-keyhole-line',
    },
    children: [
      {
        path: 'treehole',
        name: 'Treehole',
        component: () => import('@/views/treehole'),
        meta: {
          title: '树洞',
          icon: 'folder-keyhole-line',
        },
      },
    ],
  },
  {
    path: '/report',
    component: Layout,
    redirect: '/report/report',
    meta: {
      title: '举报审核',
      icon: 'alert-line',
    },
    children: [
      {
        path: 'report',
        name: 'Report',
        component: () => import('@/views/report'),
        meta: {
          title: '举报审核',
          icon: 'alert-line',
        },
      },
    ],
  },
  // {
  //   path: '/vab',
  //   component: Layout,
  //   redirect: '/vab/table',
  //   alwaysShow: true,
  //   meta: {
  //     title: '组件',
  //     icon: 'apps-line',
  //   },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/vab/table'),
  //       meta: {
  //         title: '表格',
  //         icon: 'table-2',
  //       },
  //     },
  //     {
  //       path: 'icon',
  //       name: 'Icon',
  //       component: () => import('@/views/vab/icon'),
  //       meta: {
  //         title: '图标',
  //         icon: 'remixicon-line',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/test',
  //   component: Layout,
  //   redirect: '/test/test',
  //   meta: {
  //     title: '动态路由测试',
  //     icon: 'test-tube-line',
  //   },
  //   children: [
  //     {
  //       path: 'test',
  //       name: 'Test',
  //       component: () => import('@/views/test'),
  //       meta: {
  //         title: '动态路由测试',
  //         icon: 'test-tube-line',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/error',
  //   name: 'Error',
  //   component: Layout,
  //   redirect: '/error/403',
  //   meta: {
  //     title: '错误页',
  //     icon: 'error-warning-line',
  //   },
  //   children: [
  //     {
  //       path: '403',
  //       name: 'Error403',
  //       component: () => import('@/views/403'),
  //       meta: {
  //         title: '403',
  //         icon: 'error-warning-line',
  //       },
  //     },
  //     {
  //       path: '404',
  //       name: 'Error404',
  //       component: () => import('@/views/404'),
  //       meta: {
  //         title: '404',
  //         icon: 'error-warning-line',
  //       },
  //     },
  //   ],
  // },
  {
    path: '/*',
    redirect: '/404',
    hidden: true,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
