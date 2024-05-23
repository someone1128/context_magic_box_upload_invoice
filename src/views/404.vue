<template>
    <div class="h-full flex items-center justify-center">
        <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
            <template #footer>
                <n-button type="primary" @click="() => router.push({ path: '/' })">去首页吧</n-button>
            </template>
        </n-result>
    </div>
</template>

<script setup lang="ts">
import { router } from '@/router'
</script>

<style scoped lang="less">

</style>
