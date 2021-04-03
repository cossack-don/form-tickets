
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'App',
        component: App
    },


]

const router = new VueRouter({

    // mode: 'history',
    // base: process.env.BASE_URL,
    // мод хистори убирает хэш, он нужен для продакшен версии для роутов
    routes

})

export default router