import request from '@/router/axios';

export const getOffices = () => {
    return request({
      url: '/api/memo-iot/iot/sysOffice',
      method: 'get',
      params: {
        
      }
    })
}

export const getHydrantGprs = () => {
  return request({
    url: '/api/memo-iot/iot/getHydrantGprs',
    method: 'get',
    params: {
      
    }
  })
}

export const getMapBound = (officeId, level) => {
  return request({
    url: '/api/memo-iot/iot/getMapBound',
    method: 'post',
    params: {
      officeId,
      level
    }
  })
}