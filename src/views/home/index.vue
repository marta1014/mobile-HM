<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed/>
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-icon @click="isEditShow = true"
      name="wap-nav" slot="nav-right"></van-icon>
      <van-tab :title="item.name"
      v-for="item of channels" :key="item.id">

        <!-- 文章列表 被下拉刷新包裹 -->
        <article-list :channel="item"></article-list>
        <!-- /文章列表 -->
      </van-tab>
    </van-tabs>
    <van-popup
    closeable
    v-model="isEditShow"
    position="bottom"
    :style="{ height: '90%' }">
    <channel-edit :userChannels="channels" class="channel-edit"/>
    </van-popup>
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
      channels: [],
      isEditShow: false
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

// 如果想要在父组件中影响子组件样式：
// 要么不要有作用域，那就是全局，影响任何组件

// 如果有作用域
// 默认只能影响到自子组件的根节点样式生效
// 审查元素找到子组件根节点类名使用
// 或者手动给子组件添加一个 class，它会自动添加到子组件根节点的 class 中
// 如果需要影响的更深，则使用深度选择器：>>>、/deep/、::v-deep
// >>> 在 less、sass、stylus 等 CSS 预处理器中会报错
// 所以建议使用 /deep/ 或者 ::v-deep
</script>

<style lang="less" scoped>
.home{
  padding-top: 90px;
  padding-bottom: 50px;
  /deep/ .van-icon{
    position: fixed;
    right: 0;
    line-height: 44px;
    background-color: #fff;
  }
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-popup {
    overflow: hidden;
  }
  .channel-edit{
    padding: 70px 0;
  }
  /deep/ .van-icon-cross{
    position: fixed;
    left: 20px;
    top: 10%;
  }
}
</style>
