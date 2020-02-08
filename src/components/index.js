import articleList from './home/article-list'
import channelEdit from './home/channel-edit.vue'
import searchList from './search/res-list'
import commentItem from './article/comment-itm'
import commentReply from './article/comment-reply'
import postAnswer from './article/post-answer'
import myArticle from './user/myArticle'
import myCollect from './user/myCollect'
import myHistory from './user/myHistory'
export default {
  install (Vue) {
    Vue.component('channel-edit', channelEdit)// 全局注册list组件
    Vue.component('article-list', articleList)
    Vue.component('search-list', searchList)
    Vue.component('comment-item', commentItem)
    Vue.component('comment-reply', commentReply)
    Vue.component('post-answer', postAnswer)
    Vue.component('my-article', myArticle)
    Vue.component('my-collect', myCollect)
    Vue.component('my-history', myHistory)
  }
}
