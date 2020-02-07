<template>
  <van-cell class="comment-item">
    <!-- 评论作者头像 -->
    <van-image
      slot="icon"
      class="avatar"
      round
      :src="comment.aut_photo"
    />
    <!-- 评论作者头像 -->

    <!-- 评论作者名字 -->
    <span style="color: #466b9d;" slot="title">{{ comment.aut_name }}</span>
    <!-- 评论作者名字 -->

    <div slot="label">
      <!-- 评论内容 -->
      <p style="color: #363636;">{{ comment.content }}</p>
      <!-- /评论内容 -->

      <p>
        <!-- 评论发布日期 -->
        <span style="margin-right: 10px;">{{ comment.pubdate | relativeTime}}</span>
        <!-- 评论发布日期 -->

        <van-button
          size="mini"
          type="default"
          @click="$emit('click-reply',comment)"
        >回复 {{ comment.reply_count }}</van-button>
        <!-- 触发事件的同时携带 comment对象 -->
      </p>
    </div>
    <div slot="right-icon" class="like-container" @click="onLike">
      <!-- 一种是在组件内写点赞 一种是传出去事件$emit('click-good') 由使用该组件的来决定操作 -->
      <van-icon
        :color="comment.is_liking ? '#e5645f' : ''"
        :name="comment.is_liking ? 'good-job' : 'good-job-o'"
      />
      <span>{{ comment.like_count ? comment.like_count : '赞' }}</span>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLick, delCommentLick } from '@/api/article'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {
  },
  created () {},
  methods: {
    async onLike () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '努力操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        if (this.comment.is_liking) {
          await delCommentLick(this.comment.com_id.toString())
          this.comment.like_count--
          this.$toast.success('取消成功')
        } else {
          await addCommentLick(this.comment.com_id.toString())
          this.comment.like_count++
          this.$toast.success('点赞成功')
        }
        // 更新视图
        this.comment.is_liking = !this.comment.is_liking
      } catch (error) {
        console.log(error)
        this.$toast('操作失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  display: flex;
  align-items: flex-start;
  .avatar {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .like-container {
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
  }
}
</style>
