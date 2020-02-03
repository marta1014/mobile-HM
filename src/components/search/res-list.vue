<template>
  <div class="res-list">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad">
      <van-cell
      v-for="(item,index) in resSearch"
      :key="index"
      :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchRes } from '@/api/search'
export default {
  name: 'resList',
  props: {
    words: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      resSearch: []
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getSearchRes({
        page: this.page,
        per_page: this.perPage,
        q: this.words
      })
      // console.log(data)

      const { results } = data.data
      this.resSearch.push(...results)
      // // 加载状态结束
      this.loading = false

      // // 数据全部加载完成
      if (results.length) {
        this.page++ // 继续获取更新获取下一页数据的页码
      } else {
        this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
      }
    }
  }
}
</script>

<style>
</style>
