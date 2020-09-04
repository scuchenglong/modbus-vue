import request from '@/router/axios';

export const getList = (current, size, params) => {
    return request({
        url: '/api/memo-runinfo/coolwaterpump/list',
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
        url: '/api/memo-runinfo/coolwaterpump/detail',
        method: 'get',
        params: {
            id
        }
    })
}

export const remove = (ids) => {
    return request({
        url: '/api/memo-runinfo/coolwaterpump/remove',
        method: 'post',
        params: {
            ids,
        }
    })
}

export const add = (row) => {
    return request({
        url: '/api/memo-runinfo/coolwaterpump/submit',
        method: 'post',
        data: row
    })
}

export const update = (row) => {
    return request({
        url: '/api/memo-runinfo/coolwaterpump/submit',
        method: 'post',
        data: row
    })
}

