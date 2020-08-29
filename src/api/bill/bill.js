import request from '@/router/axios';
import upDownLoad from "../../util/upDownLoad";
import {Loading, Message} from 'element-ui';

export const getList = (current, size, params) => {
    return request({
        url: '/api/memo-bill/bill/list',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        }
    })
}

/**
 * 下载excel
 * @param current
 * @param size
 * @param params
 */
export const downloadExcel = (row) => {
    let url = '/api/memo-bill/bill/downloadExcel'
    let method = 'get'
    let responseType = 'blob'
    upDownLoad.downLoadExcel(url, method, responseType, row)
}

export const getDetail = (id) => {
    return request({
        url: '/api/memo-bill/bill/detail',
        method: 'get',
        params: {
            id
        }
    })
}

export const remove = (ids) => {
    return request({
        url: '/api/memo-bill/bill/remove',
        method: 'post',
        params: {
            ids,
        }
    })
}

export const add = (row) => {
    return request({
        url: '/api/memo-bill/bill/submit',
        method: 'post',
        data: row
    })
}

export const update = (row) => {
    return request({
        url: '/api/memo-bill/bill/submit',
        method: 'post',
        data: row
    })
}

