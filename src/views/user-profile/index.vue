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
      <van-cell title="性别"
      @click="showGender = true"
      :value="user.gender === '0' ? '男': '女'" is-link />
      <van-cell title="生日"
      @click="showBirthday = true"
      :value="user.birthday " is-link />
    </van-cell-group>

    <!-- 图片预览 -->
    <!-- 设置关闭置空 来处理两次预览同图不触发预览 -->
    <van-image-preview v-model="previewShow" @close="$refs.file.value = ''"
    :images="images">
      <van-nav-bar
      slot="cover"
      left-text="取消"
      right-text="确定"
      @click-left="previewShow = false"
      @click-right="onUpdate"
      />
    </van-image-preview>

    <!-- 用户昵称修改 -->
    <van-popup
    v-model="showPopupName"
    position="bottom "
    :style="{ height: '20%' }">
    <van-nav-bar
      title="编辑名称"
      left-text="取消"
      right-text="确定"
      @click-left="showPopupName = false"
      @click-right="onUpdateName"
      ></van-nav-bar>
      <van-field
        :value="user.name"
        rows="2"
        autosize
        type="textarea"
        maxlength="20"
        placeholder="请输入名称"
        show-word-limit
        @input="inputmMessage = $event"
     />
     <!-- $event 是 filed组件触发input事件所传出来的input的数据
     然后保存在了data中的inputmMessage中 -->
    </van-popup>

    <!-- 性别修改 -->
    <van-action-sheet
      v-model="showGender"
      :actions="actions"
      cancel-text="取消"
      @cancel="showGender = false"
      @select="gendrSelect"
    />

    <!-- 生日修改 -->
    <van-popup
    v-model="showBirthday "
    position="bottom ">
      <van-datetime-picker
        :value="selectDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showBirthday = false"
        @confirm="onUpdateBirthday"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, updateUserPhoto,
  updateUserProfile } from '@/api/user'
import moment from 'moment'
export default {
  name: 'user-profile',
  data () {
    return {
      user: {},
      showPopupName: false,
      previewShow: false,
      images: [],
      inputmMessage: '',
      showGender: false,
      showBirthday: false,
      actions: [
        // 自己添加value 省去请求判断
        { name: '男', value: 0 },
        { name: '女', value: 1 }
      ],
      minDate: new Date(1970, 0, 1),
      maxDate: new Date()
      // currentDate: new Date()
    }
  },
  computed: {
    // 为了访问方便 每次都要$this.$refs['files]访问
    // 所以通过计算属性封装简化对其的访问
    file () { // 访问file === 访问this.$refs['file]
      return this.$refs['file']
    },
    selectDate () {
      // 把字符串格式的日期 转换为js日期对象 设置给vant的日期选择器
      return new Date(this.user.birthday)
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
    async onUpdate () {
      // 1.构建包含（文件数据）的表单对象 务必放入FormData
      const fd = new FormData()
      fd.append('photo', this.file.files[0])
      // 2.请求提交
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '更新中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const { data } = await updateUserPhoto(fd)
        this.$toast.success('更新成功')
        this.previewShow = false
        this.user.photo = data.data.photo
      } catch (error) {
        console.log(error)
        this.$toast.fail('更新失败')
      }
      // 3.根据相应结果后续处理
    },
    async updateUserProfile (field, value) {
      // field要修改的数据字段  value数据值
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '更新中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        await updateUserProfile({
        // 使用中括号 否则会认为字符串而非变量
          [field]: value
        })
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    async onUpdateName () {
      // 1.请求更新
      await this.updateUserProfile('name', this.inputmMessage)
      // 2.后续处理 更新世图/关闭弹层
      this.user.name = this.inputmMessage
      this.showPopupName = false
    },
    async  gendrSelect (data) {
      // 接口原因 显示不正确
      this.updateUserProfile('gender', data.value)
      this.user.gender = data.value
      this.showGender = false
    },
    async onUpdateBirthday (value) {
      // 格式化处理value
      const date = moment(value).format('YYYY-MM-DD')
      await this.updateUserProfile('birthday', date)
      this.user.birthday = date
      this.showBirthday = false
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
   /deep/ .van-image-preview__cover {
    top:unset;
    left: 0;
    right:0;
    bottom: 0;
    .van-nav-bar {
      background-color: #000;
    }
}
.van-popup{
 /deep/  .van-nav-bar{
   background-color: #fff;
   .van-nav-bar__title{
     color: #323233;
   }
  }
}
}

</style>
