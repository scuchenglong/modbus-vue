import request from '@/router/axios';

export const getList = (current, size, params) => {
    return request({
        url: '/api/memo-equipbase/equipbase/list',
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
        url: '/api/memo-equipbase/equipbase/detail',
        method: 'get',
        params: {
            id
        }
    })
}

export const remove = (ids) => {
    return request({
        url: '/api/memo-equipbase/equipbase/remove',
        method: 'post',
        params: {
            ids,
        }
    })
}

export const add = (row) => {
    return request({
        url: '/api/memo-equipbase/equipbase/submit',
        method: 'post',
        data: row
    })
}

export const update = (row) => {
    return request({
        url: '/api/memo-equipbase/equipbase/submit',
        method: 'post',
        data: row
    })
}

