import type {AxiosProgressEvent, GenericAbortSignal, ResponseType} from 'axios'

import service from './axios'
export interface HttpOption {
    url?: string
    data?: any,
    params?: any,
    method?: string
    headers?: any
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
    signal?: GenericAbortSignal
    beforeRequest?: () => void
    afterRequest?: () => void
    responseType?: ResponseType
    custom?: {
        [key:string]: any
    }
}

export function post<T = any>(url: string, options?: HttpOption): Promise<T> {
    return service({
        url,
        method: 'POST',
        ...options
    })
}
export function get<T = any>(url: string, options?: HttpOption): Promise<T> {
    return service({
        url,
        method: 'GET',
        ...options
    })
}

export function put<T = any>(url: string, options?: HttpOption): Promise<T> {
    return service({
        url,
        method: 'PUT',
        ...options
    })
}

export function del<T = any>(url: string, options?: HttpOption): Promise<T> {
    return service({
        url,
        method: 'DELETE',
        ...options
    })
}

export function request<T = any>(options: HttpOption): Promise<T> {
    return service(options)
}
