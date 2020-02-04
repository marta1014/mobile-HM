import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user: null// 默认null 登陆后存token
    user: getItem('user')
  },
  mutations: {

    setUser (state, data) { // 登陆成功调用mutation存数据
      if (data && data.token) {
        // 如果data有效且有token
        // 解析token拿到用户ID
        data.userId = decode(data.token).user_id
      }
      state.user = data
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
