<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading
    v-if="loading"
      class="loading"
      color="#1989fa"
      vertical
    >
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="arDetails.title">
      <h3 class="title">{{arDetails.title}}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="arDetails.aut_photo"
          />
          <div class="text">
            <p class="name">{{arDetails.aut_name}}</p>
            <p class="time">{{arDetails.pubdate | dateTime('YYYY-MM-DD')}}</p>
          </div>
        </div>
        <!-- 用户没登陆或当前文章非本人所写按钮显示 -->
        <!-- v-if="!$store.state.user || arDetails.aut_id  !== 当前登陆用户id" -->
        <van-button class="follow-btn" size="small" round
        @click="onfollow" :loading="followLoading"
        v-if="!$store.state.user || arDetails.aut_id  !== $store.state.user.userId"
        :type="arDetails.is_followed ? 'default' :'info'" >
          {{arDetails.is_followed? '已关注' : "+ 关注"}}</van-button>
      </div>
      <div class="markdown-body" v-html="arDetails.content"></div>
      <!-- 文章评论 -->
       <van-list
          v-model="articleComment.loading"
          :finished="articleComment.finished"
          finished-text="没有更多了"
          @load="onLoad">
      <van-cell class="commentSection">全部评论</van-cell>
      <comment-item v-for="item of articleComment.list"
      :key="item.id"  :comment="item"></comment-item>
    </van-list>
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败提示 -->
    <div class="error" v-else>
      <img src="./no-network.png" alt="no-network">
      <p class="text">亲，网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
        @click="loadArticle"
      >点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        class="comment-icon"
        name="comment-o"
        :info="articleComment.totalCount"
      />
      <van-icon
      @click="onCollect()"
        color="orange"
        :name="arDetails.is_collected? 'star' : 'star-o'"
      />
      <van-icon
        color="#e5645f"
        @click="onLike"
        :name="arDetails.attitude === 1?'good-job':'good-job-o'"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getDetails, addCollect,
  delCollect, addLike, delLike,
  addFollow, delFollow, getComments } from '@/api/article'
export default {
  name: 'articlePage',
  props: {
    id: {// 接收到的路由映射参数
      type: [Array, Object, String],
      required: true
    }
  },
  data () {
    return {
      arDetails: {},
      loading: true,
      followLoading: false,
      articleComment: { // 文章评论相关数据
        list: [],
        loading: false,
        finished: false,
        offset: null, // 请求下一页数据的页码
        totalCount: 0 // 总数据条数
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getDetails(this.id)
        // console.log(data.data)
        this.arDetails = data.data
      } catch (error) {
      }
      this.loading = false
    },
    async onCollect () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '努力操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        if (this.arDetails.is_collected) {
          await delCollect(this.id)
          this.arDetails.is_collected = false
          this.$toast.success('取消收藏')
        } else {
          await addCollect(this.id)
          this.arDetails.is_collected = true
          this.$toast.success('收藏成功')
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    },
    async onLike () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '努力操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        if (this.arDetails.attitude === 1) {
          await delLike(this.id)
          this.arDetails.attitude = -1
          this.$toast.success('取消点赞')
        } else {
          await addLike(this.id)
          this.arDetails.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    },
    async onfollow () {
      this.followLoading = true
      try {
        if (this.arDetails.is_followed) {
          await delFollow(this.arDetails.aut_id)
        } else {
          await addFollow(this.arDetails.aut_id)
        }
        // 更新视图
        this.arDetails.is_followed = !this.arDetails.is_followed
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
      this.followLoading = false
    },
    async onLoad () { // 获取评论
      const { data } = await getComments({
        type: 'a',
        source: this.id,
        offset: null, // 获取下一页
        limit: null
      })
      const { results } = data.data
      this.articleComment.list.push(...results)
      // console.log(results)

      // 更新评论条数
      this.articleComment.totalCount = data.data.total_count
      // 加载状态结束
      this.articleComment.loading = false

      // 数据全部加载完成
      if (results.length) {
        this.articleComment.offset = data.data.last_id // 更新页码
      } else {
        this.articleComment.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  padding: 46px 20px 150px;
  background: #fff;
 .van-icon{ color:#fff}
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3A3A3A;
    }
    .author-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      height: 40px;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .text {
          line-height: 1.5;
          .name {
            margin: 0;
            font-size: 14px;
          }
          .time {
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .commentSection{
    margin-top: 100px;
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
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
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
      z-index: 2;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>
