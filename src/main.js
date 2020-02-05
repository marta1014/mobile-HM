import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import component from './components'
import 'amfe-flexible'// 动态rem基准值
import './utils/validation'
import './utils/datetime'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/index.less'

Vue.use(Vant)
Vue.use(component)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
