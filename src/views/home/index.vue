<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed/>
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-icon class="tab-btn" @click="popupShow = true"
      name="wap-nav" slot="nav-right"></van-icon>
      <van-tab :title="item.name"
      v-for="item of channels" :key="item.id">

        <!-- 文章列表 被下拉刷新包裹 -->
        <article-list :channel="item"></article-list>
        <!-- /文章列表 -->
      </van-tab>
    </van-tabs>
    <van-popup
        v-model="popupShow"
        position="bottom"
        closeable
        round
        :style="{ height: '94%' }">
        <!--
        默认传递一个名字叫value的数据给子组件 ：value=“active”
        默认监听名字叫input的自定义事件 @input=“active=事件参数”
        当子组件发布this.$emit('input', 数据)
        这里使用 v-model   绑定了 active 数据
        子组件在内部需要声明 value 属性接收使用
        子组件需要在内部通过 this.$emit('input', 数据) 修改该数据

        什么时候用？
        父子组件需要同步一些数据的时候，更简洁 本质还是父子通信
        -->
        <channel-edit :myChannels="channels"
        @close="popupShow = false"
        v-model="active"></channel-edit>
        </van-popup>
    <!-- /频道列表 -->
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
import { getItem } from '@/utils/storage'
export default {
  name: 'homePage',
  data () {
    return {
      active: 0,
      channels: [],
      popupShow: false
    }
  },
  methods: {
    async getUserChannels () {
      let localChannels = getItem('user-channels')
      // 如果本地有 用本地 没有 则请求获取
      if (localChannels) {
        this.channels = localChannels
      } else {
        try {
          const { data } = await getChannels()
          this.channels = data.data.channels
        } catch (error) {
          // console.log(error)
        }
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
  /deep/ .van-tabs__wrap{
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
  /deep/ .tab-btn{
    position: fixed;
    right: 0;
    line-height: 44px;
    background-color: #fff;
  }
 .van-popup{
  /deep/ .van-popup__close-icon{
    position: fixed;
    left: 20px;
    top: 60px;
    // z-index: -1;
  }
 }
}
</style>
