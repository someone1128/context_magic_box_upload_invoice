/*
 * @Author: mjjh
 * @LastEditTime: 2023-04-15 23:27:47
 * @FilePath: \chatgpt-shuowen\src\store\modules\auth\index.js
 * @Description: 存储用户数据
 */
import { defineStore } from 'pinia'
import { getToken, setToken } from './helper'

export const useAuthStore = defineStore('auth-store', {
  state: () => ({
    token: getToken(),
    // 控制登录/注册弹窗
    authModelShow: false,
    // 邀请码
    invitationCode: '',
  }),

  actions: {
    setToken(token: string) {
      this.token = token
      setToken(token)
    },
    // 控制登录/注册弹窗
    setAuthModelShow(flag = true) {
      this.authModelShow = flag
    },
    // 设置邀请码
    setInvitationCode(code: string) {
      this.invitationCode = code
    },
  },
})


