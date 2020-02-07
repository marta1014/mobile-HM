<template>
  <div class="user-profile">
       <van-nav-bar title="个人信息" left-arrow right-text="保存" />

       <van-cell-group>
      <van-cell title="头像" is-link @click="onFileSelect">
        <van-image
          round
          width="30"
          height="30"
          fit="cover"
          :src="user.photo"
        />
      </van-cell>
      <!-- file类型的input -->
      <input type="file" hidden ref="file" @change="onFileChange">
      <van-cell title="昵称"
      @click="showPopupName = true"
      :value="user.name" is-link />
      <van-cell title="性别" :value="user.gender === '0' ? '男': '女'" is-link />
      <van-cell title="生日" :value="user.birthday " is-link />
    </van-cell-group>

    <!-- 图片预览 -->

    <van-image-preview v-model="previewShow" :images="images">
      <van-nav-bar
      slot="cover"
      left-text="取消"
      right-text="确定"
      @click-left="previewShow = false"
      @click-right="onUpdate"
      />
    </van-image-preview>

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
      showPopupName: false,
      previewShow: false,
      images: []
    }
  },
  computed: {
    file () { // 访问file === 访问this.$refs['file]
      return this.$refs['file']
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
    },
    onFileSelect () {
      // 手动触发input的点击事件
      // this.$refs['file'].click()
      this.file.click()
    },
    onFileChange () { // 图片预览 本地方式
      // 1.拿到file类型input选择的文件对象
      const fileObj = this.file.files[0]
      // console.log(fileObj, this.file.files)

      // 2.使用window.URL.createObjectURL(file)得到文件数据
      const fileData = window.URL.createObjectURL(fileObj)

      // 3.将img.src = 第二步得到的结果
      // 如果需要自定义里面的模版内容 则通过模版的方式来使用该组件
      this.images = [fileData]
      this.previewShow = true
    },
    onUpdate () {}
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
   /deep/ .van-image-preview__cover {
    top:unset;
    left: 0;
    right:0;
    bottom: 0;
    .van-nav-bar {
      background-color: #000;
    }
}
}

</style>
