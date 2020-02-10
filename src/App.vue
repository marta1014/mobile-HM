<template>
  <div id="app">
    <!--  keep-alive 专门用于组件缓存 某些生命周期钩子函数就不会再触发
    默认所有组件都缓存 include（缓存包含） exclude（不缓存包含）
    -->
    <keep-alive :include="catchPages">
       <router-view/>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      catchPages: ['tabbar']
    }
  }
}

</script>

<style lang="less">
</style>
