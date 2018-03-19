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
@import '~v-style/utils.scss';  // 非 js 模块别名， 要在使用时加前缀 ~ ，以帮助 webpack 识别别名，否则将是 loader 来识别 style 标签中的引用地址

.app-tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  @include bottom-1px(rgba(7, 17, 27, 0.1));
  .tab-item {
    flex: 1;
    text-align: center;
    & > a {
      display: block;
      font-size: $mid/2;
      color: rgba(77, 85, 93, 1);
    }
    & > .activated {
      color: rgba(240, 40, 40, 1);
    }
  }
}
</style>
