<template>
  <div class="app-tab scale">
    <div class="tab-item">
      <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/ratings">评价</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/seller">商家</router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '~v-style/AppTab.scss';  // 非 js 模块别名， 要在使用时加前缀 ~ ，以帮助 webpack 识别别名，否则将是 loader 来识别 style 标签中的引用地址

</style>
