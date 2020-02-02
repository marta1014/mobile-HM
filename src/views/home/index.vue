<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" />
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item of channels" :key="item.id">
        <!-- 文章列表 被下拉刷新包裹 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
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
      list: [],
      channels: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 1000)
    },
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
