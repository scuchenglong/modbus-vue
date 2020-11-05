import request from '@/router/axios';

export const pushData = (data) => {
    return request({
        url: '/api/memo-control/ctrlight/push',
        method: 'post',
        data: data
    })
}

export const getList = (current, size, params) => {
    return request({
        url: '/api/memo-control/ctrlight/list',
        method: 'get',
        params: {
            ...
                params,
            current,
            size,
        }
    })
}

export const getDetail = (id) => {
    return request({
        url: '/api/memo-control/ctrlight/detail',
        method: 'get',
        params: {
            id
        }
    })
}

export const remove = (ids) => {
    return request({
        url: '/api/memo-control/ctrlight/remove',
        method: 'post',
        params: {
            ids,
        }
    })
}

export const add = (row) => {
    return request({
        url: '/api/memo-control/ctrlight/submit',
        method: 'post',
        data: row
    })
}

export const update = (row) => {
    return request({
        url: '/api/memo-control/ctrlight/submit',
        method: 'post',
        data: row
    })
}

