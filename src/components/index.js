import articleList from './home/article-list'

export default {
  install (Vue) {
    Vue.component('article-list', articleList)// 全局注册list组件
  }
}
