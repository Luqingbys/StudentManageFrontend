import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    component: () => import('../layout/MainLayout.vue'),
    children: [
      {
        path: '/student',
        component: () => import('../views/student/StudentView.vue')
      },
      {
        path: '/study',
        component: () => import('../views/student/study/Study.vue')
      },
      {
        path: '/course',
        component: () => import('../views/course/Course.vue')
      },
      {
        path: '/borrow',
        component: () => import('../views/student/reservation/BorrowView.vue')
      },
      {
        path: '/department',
        component: () => import('../views/department/Department.vue')
      },
      {
        path: '/books',
        component: () => import('../views/book/Book.vue')
      },
      {
        path: '/dormitory',
        component: () => import('../views/dormitory/Dormitory.vue')
      },
      {
        path: '/apprenticeship',
        component: () => import('../views/student/follow/WithTutor.vue')
      },
      {
        path: '/stay',
        component: () => import('../views/student/stay/Stay.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/student/reservation/User.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/book/Book.vue')
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/Register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
