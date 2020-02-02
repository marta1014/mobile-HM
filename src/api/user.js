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
export const login = data => request({// 登录
  url: '/app/v1_0/authorizations',
  method: 'post',
  data
})

export const getSmsCode = mobile => { // 获取验证码
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户个人信息
export const getUserinfo = () => request({ url: `/app/v1_0/user` })

// 获取频道列表 用户/推荐
export const getChannels = () => request({ url: `/app/v1_0/user/channels` })
