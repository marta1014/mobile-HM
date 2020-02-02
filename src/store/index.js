import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user: null// 默认null 登陆后存token
    user: JSON.parse(window.localStorage.getItem('user'))
  },
  mutations: {
    setUser (state, data) { // 登陆成功调用mutation存数据
      state.user = data
      window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
