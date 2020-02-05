// cnpm i moment -S
// 时间格式化 配置语言
import moment from 'moment'
import Vue from 'vue'
moment.locale('zh-cn')

// 添加全局过滤器
Vue.filter('relativeTime', value => {
  // 基于value计算相对于现在的时间 精确到秒
  return moment(value).startOf('second').fromNow()
})

Vue.filter('dateTime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  // 若没传格式 设置为默认格式
  return moment(value).format(format)
})
