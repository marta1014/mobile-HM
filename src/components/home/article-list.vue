<template>
    <van-pull-refresh v-model="isLoading"
        @refresh="onRefresh">
          <van-list v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad">
            <van-cell v-for="item in list"
            :key="item.id" :title="item.title" />
          </van-list>
        </van-pull-refresh>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'articlelist',
  // props: ['channel'],
  props: {
    channel: {// 必须提供且对象类型
      type: Object,
      required: true
    }
  },
  data () {
    return {
      active: 0,
      list: [],
      channels: [],
      loading: false,
      finished: false,
      isLoading: false,
      timestamp: null
    }
  },
  /**
   * 思路：
   * 利用组件的onLoad事件发起请求
   * 根据参数要求保存时间戳
   * 在请求历史数据时给予参数
   * 请求回数据（数组）添加至列表（数组）=> 拓展运算符
   */
  methods: {
    async onLoad () {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      // 把请求获取到的数据添加到数组列表中
      const results = data.data.results
      this.list.push(...results)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (results.length) {
        // 更新获取下一页数据的时间戳
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据，把 finished 设置为 true，不再加载更多
        this.finished = true
      }
    },
    /**
     * 思路：
     * 注册下拉刷新事件（组件）的处理函数
     * 发送请求获取文章列表数据
     * 把获取到的数据添加到当前频道的文章列表的顶部
     * 提示用户刷新成功！
     * 下拉刷新时会触发组件的 refresh 事件，
     * 在事件的回调函数中可以进行同步或异步操作，
     * 操作完成后将 v-model 设置为 false，表示加载完成。
     */
    async onRefresh () {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.list.unshift(...results)
      // 关闭loading 提示刷新成功
      this.isLoading = false
      this.$toast(`更新了${results.length}条数据`)
    }
  }
}
</script>

<style>

</style>
