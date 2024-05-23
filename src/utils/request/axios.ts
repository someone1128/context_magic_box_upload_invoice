/*
 * @Author: mjjh
 * @LastEditTime: 2023-04-16 21:00:02
 * @FilePath: \chagpt-shuowen\src\utils\request\axios.ts
 * @Description:
 */
import axios, {type AxiosResponse} from 'axios'
import {v4 as createUUID} from 'uuid'
import {ss as localCache} from '@/utils/storage'

import {UUID_KEY} from '@/enums/keyEnum'
import {logout} from "@/utils/tools";
import {useAuthStore} from "@/store";

const service = axios.create({
    baseURL: import.meta.env.VITE_GLOB_API_URL
})
// 加载条状态
let loadingBarStatus = false
// 存储加载条定时器
let loadingBarTimer: any = 0

service.interceptors.request.use(
    (config) => {
        const token = useAuthStore().token
        if (token) {
            config.headers.token = `${token}`
        }

        // 获取uuid
        let uuid: any
        if (localCache.get(UUID_KEY)) {
            uuid = localCache.get(UUID_KEY)
        } else {
            uuid = createUUID()
            localCache.set(UUID_KEY, uuid)
        }
        config.headers['user-uuid'] = uuid

        if (!loadingBarStatus) {
            if ('custom' in config) {
                config?.custom?.loadingBar && window.$loadingBar?.start()
            } else {
                window.$loadingBar?.start()
            }

        }

        return config
    },
    (error) => {
        return Promise.reject(error.response)
    },
)

service.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
        const {data, status} = response
        loadingBarStatus = true
        if (status !== 200) {
            window.$loadingBar?.error()
            throw response.data
        }

        if (typeof data === 'object' && data.code) {
            if (data.code === 401) {
                logout().then(() => {
                    console.log("退出登录");
                })
                window.$loadingBar?.error()
                window.$message?.warning('建议先进行登录获得良好的体验！')
                // authStore.setAuthModelShow(true)
                throw response.data
            } else if (data.code !== 200) {
                window.$loadingBar?.error()
                window.$message?.warning(data.msg + "\n若无法解决请在右上角意见反馈提出")
                throw response.data
            }
        }

        // 关闭进度条
        if (loadingBarTimer) {
            clearTimeout(loadingBarTimer)
            loadingBarTimer = null
        }
        loadingBarTimer = setTimeout(() => {
            window.$loadingBar?.finish()
            loadingBarStatus = false
        }, 300)

        return data
    },
    (error) => {
        window.$loadingBar?.error()
        return Promise.reject(error)
    })

export default service
