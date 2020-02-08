<template>
  <div class="user-articles">
      <!-- 导航 -->
      <van-nav-bar title="收藏/ 历史/作品"
       @click-left="$router.back()"
       left-arrow />

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
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>

</style>
