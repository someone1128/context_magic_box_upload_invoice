/*
 * @Author: mjjh
 * @LastEditTime: 2023-04-16 13:53:25
 * @FilePath: \chagpt-shuowen\src\router\index.js
 * @Description: 路由配置文件出口
 */
import type {App} from 'vue'
import type {RouteRecordRaw} from 'vue-router'
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import {setupPageGuard} from './permission'
import Layout from '@/views/layout/index.vue'


const routes: RouteRecordRaw[] = [
    {
        path: '/:id',
        name: 'root',
        component: Layout
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    },
    {
        path: '/404',
        component: () => import('@/views/404.vue'),
    },

]

export const router = createRouter({
    history: import.meta.env.NODE_ENV === 'app' ? createWebHashHistory() : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes,
    scrollBehavior: () => ({left: 0, top: 0}),
})

setupPageGuard(router)

export async function setupRouter(app: App) {
    app.use(router)
    await router.isReady()
}
