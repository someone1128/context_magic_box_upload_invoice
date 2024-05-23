<template>
  <div class="flex justify-center  h-screen bg-gray-100 p-10">
   <n-card class="max-w-[700px]">
     <div class="text-center">
       <h3 class="text-3xl font-semibold text-center text-gray-900 mb-5">上传发票😊</h3>
       <div class="text-center my-[1rem] mb-5 font-bold">{{text}}</div>
       <n-upload
           ref="uploadRef"
           @before-upload="beforeUpload"
           :show-file-list="true"
           v-model:file-list="fileList"
           directory-dnd
           :disabled="loading"
           class="inline-block mb-5">
         <n-upload-dragger>
           <div style="margin-bottom: 12px">
             <n-icon size="48" :depth="3">
               <archive-icon/>
             </n-icon>
           </div>
           <n-text style="font-size: 16px">
             {{uploadText}}
           </n-text>
         </n-upload-dragger>
       </n-upload>
       <button
           class="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
           type="submit"
           @click="submit"
           :disabled="loading">
         提交
       </button>
     </div>
   </n-card>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {NUpload, useMessage} from 'naive-ui'
import axios from 'axios'
import {useRoute} from 'vue-router'
import {ArchiveOutline as ArchiveIcon} from '@vicons/ionicons5'
import type { UploadFileInfo } from 'naive-ui'
import { useLoadingBar } from 'naive-ui'

const route = useRoute()
const uploadRef = ref(null)
const fileList = ref([])
const loading = ref(false)
const message = useMessage()
const text = ref("")
const uploadText = ref("1、点击或者拖动文件到该区域来上传")

onMounted( () => {
  checkHandler()
})

async function checkHandler(){
  const response = await axios.get('http://fangio.com.cn/api/client/common/invoice/'+route.params.id)
  console.log("初始化查询：",response.data.data);
  if (response.data.data) {
    text.value = "该邮箱已上传处理过发票了，无需上传";
    loading.value = true;
  }else{
    text.value = "数据库并没有发现这个发票的信息，无需上传，如果疑问，请联系技术员";
    loading.value = true
  }
}

const beforeUpload = (file:UploadFileInfo) => {
  if (file.file.type !== 'application/pdf') {
    message.error('请上传PDF文件！')
    return false
  }
  uploadText.value = "2、点击提交上传文件自动发送给用户邮箱";
  return true
}
const loadingBar = useLoadingBar()

const submit = async () => {
  if (fileList.value.length === 0) {
    message.error('请先选择文件')
    return
  }

  const formData = new FormData()
  let invoicePdf:UploadFileInfo = fileList.value[0];
  console.log("fileList",fileList);
  console.log("invoicePdf",invoicePdf.file);
  formData.append('invoicePdf', invoicePdf.file) // 注意file.file，因为fileList中的每个对象包含了文件信息
  formData.append('id', route.params.id)
  loading.value = true
  loadingBar.start()
  try {
    uploadText.value = "3、正在上传中";
    const {data} = await axios.post('http://localhost:8822/client/common/invoiceCallback', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log("上传响应",data);
    if (data.code === 200) {
      loadingBar.finish()
      message.success(data.msg)
      fileList.value = [] // 重置文件列表
      uploadText.value = "4、上传成功";
    }else{
      loadingBar.error()
      message.error(data.msg)
      uploadText.value = "4、上传失败，请稍后重试或者直接联系开发者反馈";
    }
  } catch (error) {
    loadingBar.error()
    message.error('上传失败')
    uploadText.value = "4、上传失败，请稍后重试或者直接联系开发者反馈";
  } finally {
    loading.value = false
    await checkHandler()
  }
}
</script>
