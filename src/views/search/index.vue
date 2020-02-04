<template>
  <div class="searchPage">
    <!-- 搜索栏 -->
    <form action="/" class="search">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
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
    @click="onSearch(item)"
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
      <van-cell :title="item" @click="onSearch(item)"
      v-for="(item,index) of historysSearch" :key="index">
          <van-icon name="close"></van-icon>
      </van-cell>
    </van-cell-group>
    <!-- /历史记录 -->
  </div>
</template>

<script>
import { getSuggest } from '@/api/search'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'searchPage',
  data () {
    return {
      searchText: '',
      resShow: false,
      suggest: [],
      historysSearch: getItem('history-search') || []
    }
  },
  methods: {
    onSearch (q) {
      // 1.修改搜索框的内容 （键入数据/联想建议/历史记录文本）
      // 回车搜索是文本框本身 本身对本身赋值无变化
      // 点击某个联想建议 文本框变为该建议点击项
      // 点击记录 文本框变为记录文本项
      this.searchText = q
      // 2.记录搜索记录
      const index = this.historysSearch.indexOf(this.searchText)
      if (index !== -1) {
        this.historysSearch.splice(index, 1)
      }
      // 3.展示搜索结果
      this.historysSearch.unshift(this.searchText)
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
  watch: {
    historysSearch () {
      setItem('history-search', this.historysSearch)
    }
  },
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
