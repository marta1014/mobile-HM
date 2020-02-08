<template>
  <div class="user-articles">
      <!-- 导航 -->
      <van-nav-bar title="收藏/ 历史/作品"
       @click-left="$router.back()"
       left-arrow fixed=""/>

    <!-- 标签 -->
  <van-tabs v-model="active">
       <van-tab title="收藏">
           <my-collect></my-collect>
       </van-tab>
       <van-tab title="历史">
           <my-history></my-history>
       </van-tab>
       <van-tab title="作品">
           <my-article></my-article>
       </van-tab>
  </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'userArticle',
  props: {
    type: String
  },
  data () {
    // 思路：拿到路由路径 对其进行查找并处理
    let active = ['collect', 'history'].indexOf(this.type)
    if (active === -1) {
      active = 2 // 我的作品
    }
    return {
    //   active: ['collect', 'history'].indexOf(this.type)
    //   routes: ['collect', 'history']
      active
    }
  }
}
</script>

<style lang="less" scoped>
.user-articles{
    padding-top: 90px;
     /deep/ .van-tabs__wrap{
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
