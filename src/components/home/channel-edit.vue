<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain>编辑</van-button>
    </van-cell>
    <van-grid>
      <van-grid-item :text="item.name" v-for="item of userChannels" :key="item.id"/>
    </van-grid>

    <van-cell title="推荐频道" :border="false">
    </van-cell>
    <van-grid>
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'channelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
</style>
