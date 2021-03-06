import request from '@/router/axios';

export const getList = (current, size, params, deptId) => {
  return request({
    url: '/api/memo-user/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
      deptId,
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/memo-user/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/memo-user/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/memo-user/update',
    method: 'post',
    data: row
  })
}

export const getUser = (id) => {
  return request({
    url: '/api/memo-user/detail',
    method: 'get',
    params: {
      id,
    }
  })
}

export const getUserInfo = () => {
  return request({
    url: '/api/memo-user/info',
    method: 'get',
  })
}

export const resetPassword = (userIds) => {
  return request({
    url: '/api/memo-user/reset-password',
    method: 'post',
    params: {
      userIds,
    }
  })
}

export const updatePassword = (oldPassword, newPassword, newPassword1) => {
  return request({
    url: '/api/memo-user/update-password',
    method: 'post',
    params: {
      oldPassword,
      newPassword,
      newPassword1,
    }
  })
}
