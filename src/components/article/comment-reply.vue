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
    <van-cell title="所有回复"></van-cell>
    <!-- 回复列表 -->
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad">
    <comment-item v-for="(item,index) of list" :key="index"
    :comment="item"></comment-item>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/article'
export default {
  name: 'comment-reply',
  props: {
    comment1: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getComments({
        type: 'c',
        source: this.comment1.com_id.toString(),
        offset: this.offset, // 获取下一页
        limit: null
      })

      const { results } = data.data
      this.list.push(...results)

      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (results.length) {
        this.offset = data.data.last_id // 更新页码
      } else {
        this.finished = true
      }
    }
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
