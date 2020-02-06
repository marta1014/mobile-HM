<template>
  <div class="comment-reply">
      <!-- 导航栏 -->
    <van-nav-bar :title="`${comment1.reply_count}条回复`">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('click-close')"
      />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <comment-item :comment="comment1"></comment-item>
    <!-- 需要拿到评论回复对象  -->
    <!-- /当前评论项 -->
  </div>
</template>

<script>
export default {
  name: 'comment-reply',
  props: {
    comment1: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.comment-reply{
   /deep/ .van-icon{
        color: #fff;
    }
}

</style>
