import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
    {
        path: "/login",
        name: "Login",
        component: () => import("./views/Login.vue"),
        meta: { public: true },
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("./views/Register.vue"),
        meta: { public: true },
    },
    {
        path: "/",
        name: "Dashboard",
        component: () => import("./views/Dashboard.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/leave",
        name: "LeaveManagement",
        component: () => import("./views/LeaveManagement.vue"),
        meta: { requiresAuth: true },
    },

    {
        path: "/overtime",
        name: "OvertimeManagement",
        component: () => import("./views/OvertimeManagement.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/toil",
        name: "TOILManagement",
        component: () => import("./views/TOILManagement.vue"),
        meta: { requiresAuth: true },
    },

    {
        path: "/reports",
        name: "Reports",
        component: () => import("./views/Reports.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/profile",
        name: "Profile",
        component: () => import("./views/Profile.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/admin/approvals",
        name: "AdminApprovals",
        component: () => import("./views/AdminApprovals.vue"),
        meta: { requiresAuth: true, requiresAdmin: true },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Navigation guard
router.beforeEach((to, _from, next) => {
    const isAuthenticated = localStorage.getItem("token") // Simple check for now

    if (to.meta.requiresAuth && !isAuthenticated) {
        next("/login")
    } else if (to.meta.public && isAuthenticated) {
        next("/")
    } else {
        next()
    }
})

export default router
