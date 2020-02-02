<template>
  <div class="loginPage">
    <van-nav-bar title="登陆" />
    <ValidationObserver ref="form">
    <ValidationProvider
    name="手机号"
    rules="required|mobile"
    >
      <van-field
      required
      v-model="user.mobile"
      label="手机号"
      placeholder="请输入用户名" />
      <!-- {{errors[0]}} -->
    </ValidationProvider>
    <ValidationProvider
    name="验证码"
    rules="required|code"
    >
      <van-field
      required
      v-model="user.code"
      label="验证码"
      placeholder="请输入验证码">
        <van-count-down
        slot="button"
        format="ss s"
        v-if="countdownShow"
        @finish="countdownShow = false"
        :time="1000*60" />
        <van-button
        v-else
        slot="button"
        size="small"
        @click="onSendSmsCode"
        type="primary">发送验证码</van-button>
      </van-field>
    </ValidationProvider>
    </ValidationObserver>
    <van-cell>
        <van-button type="info"
        @click="onLogin"
        >登陆</van-button>
    </van-cell>
    </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
import { validate } from 'vee-validate'
// 此方法专门用来验证某个字段 与this.$refs.form.validate()不是一回事
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
      const success = await this.$refs.form.validate()
      if (!success) { // 验证失败 提示并return
        setTimeout(() => {
          const { errors } = this.$refs.form
          //   console.log(errors, '失败')
          // 获取错误对象 => 对象.values得到数组 => 遍历/return 第一个错误 => 轻提示文本
          // const item = Object.values(errors).find(item => { return item[0] })
          const item = Object.values(errors).find(item => item[0])
          this.$toast(item[0])
        }, 100)
        return
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        this.$toast.success('登陆成功')
        this.$router.push('/')
        const res = await login(user)
        // console.log(res)
        // 将登陆状态存储vuex容器中
        this.$store.commit('setUser', res.data.data)
      } catch (error) {
        this.$toast.fail('登陆失败')
        this.countdownShow = false
        // console.log(error)
      }
    },
    async onSendSmsCode () {
      const { mobile } = this.user
      let res = await validate(mobile, 'required|mobile', { name: '手机号' })
      // console.log(res)
      if (!res.valid) {
        // 提示 return
        this.$toast(res.errors[0])
        return
      }
      try {
        this.countdownShow = true
        await getSmsCode(mobile)
      } catch (error) {
        // console.log(error)
        this.countdownShow = false
        if (error.response.status === 429) {
          this.$toast('请勿频繁发送')
        }
        this.$toast.fail('发送失败')
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
