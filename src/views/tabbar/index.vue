<template>
  <div class="tab-bar">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar route="">
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/qa" icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">
      {{$store.state.user ? '我的' : '未登陆'}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'tabbar'
}
</script>

<style>
</style>
