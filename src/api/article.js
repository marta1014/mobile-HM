import request from '@/utils/request'

// 获取文章列表
export const getArticles = params => request({ url: `/app/v1_1/articles`, params })

// 获取全部频道列表
export const getAllChannels = () => request({ url: `/app/v1_0/channels` })
