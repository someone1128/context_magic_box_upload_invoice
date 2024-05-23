import {createApp} from 'vue'
import App from './App.vue'
import {setupStore} from './store'
import {setupRouter} from './router'
import '@/styles/lib/tailwind.css'
import '@/styles/global.less'

function naiveStyleOverride() {
    const meta = document.createElement('meta')
    meta.name = 'naive-ui-style'
    document.head.appendChild(meta)
}


async function setupApp() {
    const app = createApp(App)
    // 注册样式
    naiveStyleOverride()
    // 注册状态库
    setupStore(app)
    // 注册路由
    await setupRouter(app)
    app.mount('#app')
}

setupApp()
