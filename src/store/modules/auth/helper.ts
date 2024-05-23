import { ss as localCache } from '@/utils/storage'

export const LOCAL_NAME = 'SECRET_TOKEN'

export function getToken() {
  return localCache.get(LOCAL_NAME)
}

export function setToken(token: string) {
  return localCache.set(LOCAL_NAME, token)
}

export function removeToken() {
  return localCache.remove(LOCAL_NAME)
}
