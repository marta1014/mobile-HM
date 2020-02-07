<template>
  <div class="user-profile">
       <van-nav-bar title="个人信息" left-arrow right-text="保存" />

       <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image
          round
          width="30"
          height="30"
          fit="cover"
          :src="user.photo"
        />
      </van-cell>
      <van-cell title="昵称"
      @click="showPopupName = true"
      :value="user.name" is-link />
      <van-cell title="性别" :value="user.gender === '0' ? '男': '女'" is-link />
      <van-cell title="生日" :value="user.birthday " is-link />
    </van-cell-group>

    <!-- 名称弹层 -->
    <van-popup
    v-model="showPopupName"
    position="bottom "
    :style="{ height: '20%' }">
    <edit-name :name="user.name"
    @close-edit="showPopupName = false"
    ></edit-name>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'user-profile',
  data () {
    return {
      user: {},
      showPopupName: false
    }
  },
  methods: {
    async getProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (error) {
        console.log((error))
      }
    }
  },
  created () {
    this.getProfile()
  }
}
</script>

<style lang="less" scoped>
.user-profile{
   /deep/ .van-nav-bar {
       color: #fff;
        .van-icon{
            color: #fff;
        }
        .van-nav-bar__text{
            color: rgb(14, 207, 233);
        }
    }
}

</style>
