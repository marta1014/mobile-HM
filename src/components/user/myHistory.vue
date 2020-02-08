<template>
    <div class="myHistory">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item.art_id.toString()" :title="item.title" />
    </van-list>
    </div>
</template>

<script>
import { getUserHistory } from '@/api/article'
export default {
  name: 'myHistory',
  props: {

  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    async onLoad () {
      const { data } = await getUserHistory({
        page: this.page,
        per_page: this.per_page
      })
      const { results } = data.data
      this.list.push(...results)
      // 加载状态结束
      this.loading = false

      // // 数据全部加载完成
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  },
  watch: {

  }
}
</script>

<style scoped lang="less">

</style>
