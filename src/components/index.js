import articleList from './home/article-list'
import channelEdit from './home/channel-edit.vue'

export default {
  install (Vue) {
    Vue.component('channel-edit', channelEdit)// 全局注册list组件
    Vue.component('article-list', articleList)
  }
}
