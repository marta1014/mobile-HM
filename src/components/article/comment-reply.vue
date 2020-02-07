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

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="showPopup = true"
      >写评论</van-button>
      <van-icon
        color="#e5645f"
        name="good-job"
      />
    </div>
    <!-- /底部区域 -->

    <!-- 发布回复 -->

     <van-popup
    v-model="showPopup"
    position="bottom">
    <post-answer
    @click-post="onPost"
    v-model="postMessage"></post-answer>
    <!-- 在组件中使用v-model语法 value input -->
    </van-popup>
  </div>
</template>

<script>
import { getComments, publishCOM } from '@/api/article'
export default {
  name: 'comment-reply',
  props: {
    comment1: {
      type: Object,
      required: true
    },
    artId: {
      type: [Object, String, Number],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      showPopup: false,
      postMessage: ''
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
    },
    async onPost () {
      if (!postMessage) { // 非空判断
        return
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '努力发布中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const postMessage = this.postMessage
        const { data } = await publishCOM({
          target: this.comment1.com_id.toString(),
          content: postMessage,
          art_id: this.artId.toString()
        })
        // 数据展示置顶
        this.list.unshift(data.data.new_obj)

        this.comment1.reply_count++

        this.$toast.success('发布成功')

        this.postMessage = ''

        this.showPopup = false
      } catch (error) {
        console.log(error)

        this.$toast.fail('发布失败')
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
    .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
  }
}

</style>
