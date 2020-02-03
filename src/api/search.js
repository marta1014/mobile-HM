import request from '@/utils/request'

// 获取联想搜索建议
export const getSuggest = q => request({ url: `/app/v1_0/suggestion`, params: { q } })
