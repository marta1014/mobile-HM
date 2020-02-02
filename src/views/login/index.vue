<template>
  <div class="loginPage">
    <van-nav-bar title="登陆" />
    <van-cell-group>
      <van-field
      required
      v-model="user.mobile"
      label="手机号"
      placeholder="请输入用户名" />
    </van-cell-group>
    <van-cell-group>
      <van-field
      required
      v-model="user.code"
      label="验证码"
      placeholder="请输入用户名">
        <van-count-down
        slot="button"
        format="ss s"
        v-if="countdownShow"
        :time="1000*60" />
        <van-button
        v-else
        slot="button"
        size="small"
        type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <van-cell>
        <van-button type="info"
        @click="onLogin"
        >登陆</van-button>
    </van-cell>
    </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'loginPage',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      countdownShow: false
    }
  },
  methods: {
    async onLogin () {
      const user = this.user
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        this.$toast.success('登陆成功')
        const res = await login(user)
        console.log(res)
      } catch (error) {
        this.$toast.fail('登陆失败')
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.loginPage{
    .van-cell{
        padding: 26px 16px;
        .van-button{
            width: 100%;
    }
    }

}
</style>
