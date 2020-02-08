<template>
  <div class="chat-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- /导航栏 -->

    <!-- 消息列表 -->
    <div class="message-list" ref="message-list">
      <div
        class="message-item"
        :class="{ reverse: item.isMe }"
        v-for="(item,index) in msgList "
        :key="index"
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          width="30"
          height="30"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="title">
          <span>{{item.msg}}</span>
        </div>
      </div>
    </div>
    <!-- /消息列表 -->

    <!-- 发送消息 -->
    <van-cell-group class="send-message">
      <van-field v-model="message" center clearable>
        <van-button slot="button" size="small"
        @click="onSend"
        type="primary">发送</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发送消息 -->
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'UserChat',
  data () {
    return {
      message: '',
      socket: '',
      msgList: getItem('chat-msg') || []
    }
  },
  created () {
    // 安装/导入/传入地址建立socket连接
    const socket = io('http://ttapi.research.itcast.cn')

    this.socket = socket// 存储

    socket.on('connect', function () { // 连接成功回调
      console.log('建立连接成功')
    })

    // 发送消息 socket.emit('type', content)
    // window.socket = socket暴露全局进行log测试

    // 接收消息 socket.on('type', data => console.log(data))
    // socket.on('message', msg => console.log('message =>', msg))
    // 同样对接收到的消息进行存储
    socket.on('message', msg => this.msgList.push(msg))
  },
  methods: {
    onSend () {
      const message = this.message
      if (!message.length) { // 判断非空
        return
      }
      // **消息类型 数据格式 接口都有要求** 自设isMe=true实现判断
      const data = { msg: message, timestamp: Date.now(), isMe: true }// 消息内容
      this.socket.emit('message', data)// 发送

      // 储存至列表
      this.msgList.push(data)

      this.message = '' // 置空文本框
    },
    toBottom () {
      const container = this.$refs['message-list']
      container.scrollTop = container.scrollHeight
    }
  },
  watch: {
    // 参数1 最新值 参数2 变化之前的旧值
    msgList (value) {
      // 消息放生变化存至本地
      setItem('chat-msg', value)

      this.$nextTick(() => {
        this.toBottom()
      })
      //   this.toBottom()// 实现滚动到底部

    /**
     * $nextTick()的作用
     * 数据影响视图不是即时的
     * 当在修改完数据后马上操作该dom 此时未更新
     * 特殊api 接收函数作为参数 自动执行
     * 该函数中的代码会确保本次数据更新视图之后才执行
     */
    }
  }
}
</script>

<style scoped lang="less">
  .chat-container {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 46px 0 50px 0;
    top: 0;
    left: 0;
    box-sizing: border-box;
    background: #f5f5f6;
    .message-list {
      height: 100%;
      overflow-y: scroll;
      .message-item {
        display: flex;
        align-items: center;
        padding: 10px;
        .title {
          background: #fff;
          padding: 5px;
          border-radius: 6px;
        }
        .avatar {
          margin-right: 5px;
        }
      }
      .reverse {
        flex-direction: row-reverse;
        .title {
          margin-right: 5px;
        }
      }
    }
    .send-message {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #f5f5f6 !important;
    }
  }
</style>
