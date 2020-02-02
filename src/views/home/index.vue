<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" />
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab :title="item.name"
      v-for="item of channels" :key="item.id">

        <!-- 文章列表 被下拉刷新包裹 -->
        <article-list :channel="item"></article-list>
        <!-- /文章列表 -->
      </van-tab>
    </van-tabs>
    <!-- /频道列表 -->
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
export default {
  name: 'homePage',
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  methods: {
    async getUserChannels () {
      try {
        const { data } = await getChannels()
        this.channels = data.data.channels
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    this.getUserChannels()
  }
}
</script>

<style>
</style>
