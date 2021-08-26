import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import User from './components/User'
import UserAuth from './components/UserAuth'

const routes = [{
        path: '/',
        name: 'root',
        component: App
    },
    {
        path: '/user/auth',
        name: "user_auth",
        component: UserAuth
    },
    {
        path: '/user/:username',
        name: "user",
        component: User
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router