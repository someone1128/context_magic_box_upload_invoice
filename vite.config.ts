import path from 'path'
import type {ConfigEnv, PluginOption, UserConfig, ProxyOptions} from 'vite'
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'

function setupPlugins(env: ImportMetaEnv): PluginOption[] {
    return [
        vue(),
        AutoImport({
            resolvers: [],
            imports: ['vue', 'vue-router'],
            dts: true,
            eslintrc: {
                enabled: true
            }
        }),
        Components({
            resolvers: [
                NaiveUiResolver()
            ],
        }),
        // 打包压缩 开启两个压缩算法,保证旧浏览器兼容性
        env.NODE_ENV === 'production' && viteCompression({
            algorithm: 'gzip',
            ext: '.gz',
            deleteOriginFile: false,
            verbose: false,
        }),
        // 谷歌提供的压缩算法
        env.NODE_ENV === 'production' && viteCompression({
            algorithm: 'brotliCompress',
            ext: '.br',
            deleteOriginFile: false,
            verbose: false,
        }),
    ]
}

export default defineConfig((env: ConfigEnv): UserConfig => {
    const viteEnv = loadEnv(env.mode, process.cwd()) as unknown as ImportMetaEnv

    return {
        base: viteEnv.VITE_PUBLIC_PATH,
        resolve: {
            alias: {
                '@': path.resolve(process.cwd(), 'src'),
            },
        },
        plugins: setupPlugins(viteEnv),
        server: {
            host: true,
            port: 1002,
            open: true,
            hmr: true,
            proxy: {
                '/auth': {
                    target: viteEnv.VITE_APP_API_BASE_URL,
                    changeOrigin: true, // 允许跨域
                },
                '/aiChat': {
                    target: viteEnv.VITE_APP_API_BASE_URL,
                    changeOrigin: true, // 允许跨域
                },
                '/c': {
                    target: viteEnv.VITE_APP_API_BASE_URL,
                    changeOrigin: true, // 允许跨域
                },
                '/user': {
                    target: viteEnv.VITE_APP_API_BASE_URL,
                    changeOrigin: true, // 允许跨域
                },
                '/dev': {
                    target: viteEnv.VITE_APP_API_BASE_URL,
                    changeOrigin: true, // 允许跨域
                },
                '/wx': {
                    target: viteEnv.VITE_APP_API_BASE_URL,
                    changeOrigin: true, // 允许跨域
                },
                '/apiWs': {
                    target: 'wss://shuai.rednutmeg.top',
                    ws: true,
                },
            },
        },
        build: {
            chunkSizeWarningLimit: 1300,
            commonjsOptions: {
                ignoreTryCatch: false,
            },
            cssCodeSplit: true,
            minify: 'terser',
            reportCompressedSize: false,
            rollupOptions: {
                output: {
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                    manualChunks(id) {
                        // 静态资源分拆打包
                        if (id.includes('node_modules'))
                            return id.toString().split('node_modules/')[1].split('/')[0].toString()
                    },
                    // 动态引入变量
                    plugins: [dynamicImportVars()],
                },
            },
            sourcemap: false,
            terserOptions: {
                ecma: undefined,
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                    pure_funcs: ['console.log'],
                },
            },
        },
    }
})
