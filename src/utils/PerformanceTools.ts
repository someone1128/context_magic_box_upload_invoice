import {MemoryInfo} from "@vueuse/core";

// \u001b[31m：前景色设置为红色
// \u001b[32m：前景色设置为绿色
// \u001b[33m：前景色设置为黄色
// \u001b[34m：前景色设置为蓝色
// \u001b[35m：前景色设置为洋红色
// \u001b[36m：前景色设置为青色
// \u001b[37m：前景色设置为白色
// \u001b[40m：背景色设置为黑色
// \u001b[41m：背景色设置为红色
// \u001b[42m：背景色设置为绿色
// \u001b[43m：背景色设置为黄色
// \u001b[44m：背景色设置为蓝色
// \u001b[45m：背景色设置为洋红色
// \u001b[46m：背景色设置为青色
// \u001b[47m：背景色设置为白色

export const log = (content: any, color: string = '\u001b[32m') => {
    console.log(color + content + color)
}

/**
 * @desc 字节换算mb
 * @author 杨
 */
export const byteConversion = (byte: number) => {
    return byte / 1024 / 1024
}

/**
 * @desc 内存使用情况
 * @author 杨
 */
export const MemoryUsage = () => {
    window.requestAnimationFrame(() => {
        // const performance: Performance = window.performance
        const memory:MemoryInfo = window.performance?.memory
        log('------内存使用情况-------')
        log(`- 上下文内可用堆的最大体积 :${byteConversion(memory.jsHeapSizeLimit)}MB`)
        log(`- 已分配的堆体积 :${byteConversion(memory.totalJSHeapSize)}MB`, )
        log(`- 当前JS堆活跃段 :${byteConversion(memory.usedJSHeapSize)}MB`, )
    })
}
/**
 * @desc
 * @author 杨
 */
