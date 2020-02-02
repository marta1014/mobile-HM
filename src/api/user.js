// 用户相关请求

import request from '@/utils/request'

// export const login = data => {
//   return request({
//     url: '/app/v1_0/authorizations',
//     method: 'post',
//     // params: {},query参数
//     // headers: {},请求头参数
//     //data  body参数
//   })
// }
export const login = data => request({
  url: '/app/v1_0/authorizations',
  method: 'post',
  data
})
