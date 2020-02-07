<template>
  <div class="edit-name">
      <van-nav-bar
      title="编辑名称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close-edit')"
      @click-right="$emit('confirm',message)"
      ></van-nav-bar>

      <van-field
       :value="name"
       rows="2"
       autosize
       type="textarea"
       maxlength="20"
       placeholder="请输入名称"
       show-word-limit
       @input="message = $event"
     />
     <!-- $event 是 filed组件触发input事件所穿出来的input的数据
     然后保存在了data中的message中 -->
  </div>
</template>

<script>
export default {
  name: 'editName',
  props: {
    name: {
      type: String,
      default: ''
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
.edit-name{
    .van-nav-bar{
        background-color: #fff;
        .van-nav-bar__text {
        color: rgb(5, 123, 242);
        }
        .van-nav-bar__title {
        color: rgb(42, 46, 49);
        }
    }
}

</style>
