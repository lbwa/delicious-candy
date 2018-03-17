<template>
  <div class="app-header">
    <div class="content-wrapper">

      <div class="avatar">
        <img :src="sellerData.avatar" width="64" height="64" alt="seller avatar"><!-- JSON 中的地址要用 v-bind 绑定-->
      </div>

      <div class="content-text">

        <div class="text-title">
          <span class="brand"></span>
          <span class="seller-name">{{ sellerData.name }}</span>
        </div>

        <div class="text-description">
          {{ sellerData.description }}/{{ sellerData.deliveryTime }}分钟送达
        </div>
        <!--  在初始化数据时，异步请求返回前，传递的是初始值，那么下面标签不显示 -->
        <!-- 第一次传值为空对象，下面 sellerData.support 为 undefined，若不加 v-if 将报错 -->
        <div class="text-support" v-if="sellerData.supports">
          <span :class='["icon", classMap[sellerData.supports[0].type]]'></span>
          <span class="support-text">{{ sellerData.supports[0].description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sellerData: {
      type: Object,
      required: true
    }
  },

  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="scss">
@import '../common/style/AppHeader.scss';
</style>
