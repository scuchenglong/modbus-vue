import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/memo-develop/datasource/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/memo-develop/datasource/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/memo-develop/datasource/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/memo-develop/datasource/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/memo-develop/datasource/submit',
    method: 'post',
    data: row
  })
}

