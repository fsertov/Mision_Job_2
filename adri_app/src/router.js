import vueRouter from 'vue-router'
import Profile from './components/profile'
import Login from './components/login'
import App from'./App'

const router = new vueRouter({
    mode:'history',
    base: __dirname,
    routes:[
        {
        path: '/',
        name: "root",
        component: App
        },

        {
        path: '/login', // "/user/{username}"
        name: "login",
        component: Login
        },

        {
        path:'/profile',
        name: "profile",
        component: Profile
        }
    ]
})
export default router
