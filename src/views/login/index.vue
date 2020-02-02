<template>
  <div class="loginPage">
    <van-nav-bar title="登陆" />
    <van-cell-group>
      <van-field required label="手机号" placeholder="请输入用户名" />
    </van-cell-group>
    <van-cell-group>
      <van-field required label="验证码" placeholder="请输入用户名">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <van-cell>
        <van-button type="info">登陆</van-button>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'loginPage'
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
