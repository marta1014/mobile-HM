<template>
  <div class="channel-edit">
     <van-cell class="channel-title" title="我的频道" :border="false">
        <van-button size="mini" round
        @click="delIcon = !delIcon"
        type="danger" plain>{{delIcon ? '完成' : '编辑'}}</van-button>
     </van-cell>
     <van-grid :gutter="10">
      <van-grid-item
      @click="myChannelClick(index)"
      v-for="(item,index) of myChannels"
      :key="item.id">
      <van-icon class="delIcon" slot="icon"
      v-show="delIcon && index !== 0" name="close"></van-icon>
      <!-- 绑定class类名 条件 => true作用 false则不作用 -->
      <span slot="text" class="text" :class="{active:value === index}">{{item.name}}</span>
      </van-grid-item>
    </van-grid>

     <van-cell  title="推荐频道" :border="false">
     </van-cell>
     <van-grid :gutter="10">
      <van-grid-item
      @click="onAdd(item)"
      :text="item.name"
      v-for="item of remainingChannels"
      :key="item.id"/>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/article'
import { setItem } from '@/utils/storage'
export default {
  name: 'channel-edit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      delIcon: false
    }
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      // console.log(data.data.channels)
      this.allChannels = data.data.channels
    },
    onAdd (item) {
      this.myChannels.push(item)
      // console.log(this.myChannels)
    },
    myChannelClick (index) {
      // 编辑状态 删除
      if (this.delIcon && index !== 0) { // 禁删推荐处理
        this.myChannels.splice(index, 1)
      } else {
        this.$emit('input', index)
        // 通知父组件关闭弹层
        this.$emit('close')
      }
    }
  },
  created () {
    this.loadAllChannels()
  },
  computed: {
    remainingChannels () {
      const channelRM = []
      this.allChannels.forEach(item => {
        if (!this.myChannels.find(item1 => item1.id === item.id)) {
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
  },
  watch: {
    myChannels () {
      setItem('user-channels', this.myChannels)
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
.channel-title{
  margin-top: 60px;
}
/deep/ .van-grid-item__content{
  position: relative;
  .van-grid-item__icon-wrapper{
    position: absolute;
    top: -10px;
    right: -6px;
    color: #f00;
    font-size: 16px;
    z-index: 10;
  }
}
.text {
  font-size: 12px;
}
.active{color: #f00}
}

</style>
