import request from '@/utils/request'

export const getArticles = params => request({ url: `/app/v1_1/articles`, params })
