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
      <van-grid-item :text="item.name" v-for="item of remainingChannels" :key="item.id" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/article'
export default {
  name: 'channelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: []
    }
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      //   console.log(data.data.channels)
      this.allChannels = data.data.channels
    }
  },
  created () {
    this.loadAllChannels()
  },
  computed: {
    remainingChannels () {
      const channelRM = []
      this.allChannels.forEach(item => {
        if (!this.userChannels.find(item1 => item1.id === item.id)) {
          channelRM.push(item)
        }
      })
      return channelRM
    }
    /** 计算属性
     * 通过遍历获取到的所有频道
     * 判断如果该项在我的频道项不包含
     * 将其push到一个新数组后将其return
     */
  }
}
</script>

<style>
</style>
