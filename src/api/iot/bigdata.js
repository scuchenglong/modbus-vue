import request from '@/router/axios';


export const getBigDataCount = () => {
    return request({
      url: '/api/memo-bigdata/bigdata/getCount',
      method: 'get',
      params: {      
      }
    })
}

export const getBigData = () => {
  return request({
    url: '/api/memo-bigdata/bigdata/getWeblogs',
    method: 'get',
    params: {      
    }
  })
}

