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

/**
 * 点赞
 */
export const addLike = articleId => request({
  method: 'POST',
  url: '/app/v1_0/article/likings',
  data: {
    target: articleId
  }
})

/**
 * 取消点赞
 */
export const delLike = articleId => request({
  method: 'DELETE',
  url: `/app/v1_0/article/likings/${articleId}`
})

/**
 * 添加关注
 */
export const addFollow = userId => request({
  method: 'POST',
  url: '/app/v1_0/user/followings',
  data: {
    target: userId
  }
})

/**
 * 取消关注
 */
export const delFollow = userId => request({
  method: 'DELETE',
  url: `/app/v1_0/user/followings/${userId}`
})

/**
 * 获取文章评论
 */
export const getComments = params => request({
  url: `/app/v1_0/comments`,
  params
})

/**
 * 发表文章评论
 */
export const publishCOM = data => request({
  method: 'post',
  url: `/app/v1_0/comments`,
  data
})

/**
 * 评论点赞
 */
export const addCommentLick = commentId => request({
  method: 'POST',
  url: '/app/v1_0/comment/likings',
  data: {
    target: commentId
  }
})

/**
 * 评论取消点赞
 */
export const delCommentLick = commentId => request({
  method: 'DELETE',
  url: `/app/v1_0/comment/likings/${commentId}`
})
