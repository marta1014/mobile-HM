import request from '@/utils/request'

// 获取文章列表
export const getArticles = params => request({ url: `/app/v1_1/articles`, params })

// 获取全部频道列表
export const getAllChannels = () => request({ url: `/app/v1_0/channels` })

// 获取文章详情
export const getDetails = id => request({ url: `/app/v1_0/articles/${id}` })

/**
 * 收藏文章
 */
export const addCollect = target => request({
  method: 'POST',
  url: '/app/v1_0/article/collections',
  data: {
    target
  }
})

/**
   * 取消收藏文章
   */
export const delCollect = target => request({
  method: 'DELETE',
  url: `/app/v1_0/article/collections/${target}`
})
