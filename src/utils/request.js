/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
import router from '@/router'

// axios.create 方法：复制一个 axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// axios 开放了自定义转换后端返回数据的 API
// 有用户决定如何让转换后端返回数据
// data 就是后端返回的原始数据
request.defaults.transformResponse = [function (data) {
  try {
    // 现在我们定制使用 json-bigint 来帮我们处理转换原始的 JSON 格式字符串
    // 这个方法类似于 JSON.parse，只不过它能把数据中的超出 JS 安全整数范围的数字给处理成正确的
    // 它内部有自己的算法，它会把大数字转为一个对象，我们在使用的时候把对象.toString() 就得到字符串形式的 id 了
    // 如果转换成功则返回成功的结果给请求使用
    // 如果转换失败则进入 catch，返回一个空对象
    return jsonBig.parse(data)

    // 它默认是这样的
    // return JSON.parse(data)
  } catch (err) {
    console.log('转换失败', err)
    return {}
  }
}]

// Add a request interceptor
request.interceptors.request.use(function (config) {
  // 统一设置token
  // Do something before request is sent
  // 此处后端要求把token放到请求头中 使用指定名字 Authorization 格式
  // config.headers 获取到本次的请求头对象 这是axios的固定API
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response && error.response.status === 401) {
    // 1.如果没有refresh token 跳转登陆页
    const user = store.state.user
    if (!user || !user.refresh_token) {
      redirectLogin()
      return
    }
    // 2.如果有 则请求新的token
    // 接口要求传refreshtoken
    // 用request发请求需要判断
    // 处理判断麻烦 用axios本身
    try {
      const { data } = await axios({
        method: 'put',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorizations: `Bearer ${user.refresh_token}`
        }
      })
      // console.log(data)
      // 3.如果刷新成功 把新的更新 进容器中
      store.commit('setUser', {
        ...user, // 对象展开混入  原数据不变 更新token
        token: data.data.token
      })
      // 4.把之前失败的请求继续发送出去
      // error.congig 本次请求的相关配置
      return request(error.config)
    } catch (error) {
      console.log(error, '刷新token失败')
      redirectLogin()
    }
  }
  return Promise.reject(error)
})

function redirectLogin () { // 跳转登陆页
  router.push({
    name: '/login',
    // query 参数会以？key=value&key=value的形式添加到url上
    query: {
      // 使用query参数把要跳转回来的路由地址传递给了登陆页面
      // router.currentRouter当前路由对象  = this.$route
      // 当前路由对象的地址
      redirect: router.currentRoute.fullpath
    }
  })
}
export default request
