<template>
                <!-- 外观视图组件 -->
  <div class="postMessage">
      <!-- value 用来指定文本框的数据内容
      当文本框输入数据会触发input事件
      它会把输入的数据通过该事件传递出来
      模版中的$event表示事件参数
      -->
      <van-field
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
        :value="value"
        @input="$emit('input',$event)"
        />
        <van-button
        :disabled="!value"
        @click="$emit('click-post')"
        type="primary" size="mini">发布</van-button>
</div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  }

}
</script>

<style lang="less" scoped>
.postMessage {
    display: flex;
    padding: 10px;
    align-items:flex-end;
    .van-field{
      background-color: #f5f7f9;
      margin-right: 10px;
    }
  }

</style>
