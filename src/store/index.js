import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user: null// 默认null 登陆后存token
    user: getItem('user')
  },
  mutations: {
    setUser (state, data) { // 登陆成功调用mutation存数据
      state.user = data
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
