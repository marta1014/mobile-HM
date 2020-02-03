<template>
  <div class="searchPage">
    <!-- 搜索栏 -->
    <form action="/" class="search">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @input="searchInput"
        @focus="resShow = false"
        @cancel="$router.back()"
      />
    </form>
    <!-- /搜索栏 -->

     <!-- 搜索结果 -->
    <search-list
    v-if="resShow" :words="searchText"></search-list>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchText">
    <van-cell
    v-for="(item,index) of suggest"
    :key="index"
    icon="search">
    <div slot="title" v-html="highlight(item,searchText)"></div>
    </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
          <van-icon name="delete"></van-icon>
          <span>全部删除</span>&nbsp;<span>完成</span>
      </van-cell>
      <van-cell title="单元格" >
          <van-icon name="close"></van-icon>
      </van-cell>
    </van-cell-group>
    <!-- /历史记录 -->
  </div>
</template>

<script>
import { getSuggest } from '@/api/search'
export default {
  name: 'searchPage',
  data () {
    return {
      searchText: '',
      resShow: false,
      suggest: []
    }
  },
  methods: {
    onSearch () {
      this.resShow = true
    },
    async searchInput () {
      if (!this.searchText) { // 非空判断 避免空数据请求
        return
      }
      const { data } = await getSuggest(this.searchText)
      this.suggest = data.data.options
    //   console.log(data)
    },
    highlight (source, keyword) {
      const reg = new RegExp(keyword, 'gi')
      const str = `<span style="color:#f00">${keyword}</span>`
      return source.replace(reg, str)
    }
  },
  watch: {},
  created () {}
}
</script>

<style scoped lang="less">
.searchPage{
    padding-top: 54px;
    .search{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 1;
    }
}
</style>
