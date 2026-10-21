import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Portfolio from '../views/Portfolio.vue'
import ProjectDetail from '../views/ProjectDetail.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/portfolio',
        name: 'Portfolio',
        component: Portfolio
    },
    {
        path: '/project/:slug',
        name: 'ProjectDetail',
        component: ProjectDetail
    }
]

const router = createRouter({
    // Ambil base dari Vite (vite.config.js) supaya gak hardcode.
    // Router-link otomatis mengikuti base ini, jadi link gak pernah salah path.
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
