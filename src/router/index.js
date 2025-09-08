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
    history: createWebHistory('/abriel-porto/'),
    routes
})

export default router
