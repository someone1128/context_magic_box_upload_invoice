<script setup lang="ts">
import {
    NConfigProvider,
    NDialogProvider,
    NLoadingBarProvider,
    NMessageProvider,
    NNotificationProvider,
    useMessage,
    zhCN,
    dateZhCN
} from 'naive-ui'
import { onMounted, h, defineComponent } from 'vue'
import {MemoryUsage} from "@/utils/PerformanceTools";
function registerNaiveTools() {
    window.$message = useMessage()
}


onMounted(() => {
  MemoryUsage()
})

const NaiveProviderContent = defineComponent({
    modelName: 'NaiveProviderContent',
    setup() {
        registerNaiveTools()
    },
    render() {
        return h('div')
    },
})

</script>

<template>
    <n-config-provider class="h-full" :locale="zhCN" :date-locale="dateZhCN">
        <NLoadingBarProvider>
            <NDialogProvider>
                <NNotificationProvider>
                    <NMessageProvider>
                        <router-view />
                        <NaiveProviderContent />
                    </NMessageProvider>
                </NNotificationProvider>
            </NDialogProvider>
        </NLoadingBarProvider>
    </n-config-provider>
</template>

<style scoped lang="less">
</style>
