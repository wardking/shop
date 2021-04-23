import Vue from 'vue'
import VueRouter from 'vue-router'
// import 

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: "/login",
        component: () => import("../components/login.vue")
    },
    {
        path: "/home",
        component: () => import("../components/Home.vue"),
        redirect: "/welcome",
        children: [{
                path: "/welcome",
                component: () => import("../components/Welcome.vue")
            },
            {
                path: "/users",
                component: () => import("../components/user/Users.vue")
            },
            {
                path: "/rights",
                component: () => import("../components/power/Rights.vue")
            },
            {
                path: "/roles",
                component: () => import("../components/power/Roles.vue")
            },
            {
                path: "/categories",
                component: () => import("../components/goods/Cate.vue")
            },
            {
                path: "/params",
                component: () => import("../components/goods/Params.vue")
            },
        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
// 路由导航守卫
router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数 表示放行或者强制跳转
    if (to.path === '/login') return next();
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token');
    if (!tokenStr) return next('/login');
    next()
})
export default router