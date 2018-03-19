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

      <div class="support-count" v-if="sellerData.supports" @click="toggleSellerDetail">
        <span class="count">{{ sellerData.supports.length }}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>

    <div class="bulletin-wrapper" @click="toggleSellerDetail">
      <span class="bulletin-icon"></span><span class="bulletin-text">{{ sellerData.bulletin }}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>

    <div class="app-header-bg">
      <img :src="sellerData.avatar" width="100%" height="100%" alt="app-header-bg">
    </div>

    <!-- 弹出详情页开始 -->

    <!-- v-show 与 v-if 区别在于 v-show 仅是 display 的切换，一定会渲染该元素 -->
    <transition name="fade">
      <div v-show="showSellerDetail" class="seller-detail">

        <div class="detail-wrapper clearfix"><!-- 用于包装内容区，撑开视口，使 footer 保持在底部 -->
          <div class="seller-detail-main">
            <h1 class="seller-name">{{ sellerData.name }}</h1>
            <!-- 星星组件容器 -->
            <div class="star-wrapper">
              <BaseStar :score="sellerData.score || 0" :size="48"></BaseStar>
            </div>

            <div class="seller-detail-title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>

            <ul v-if="sellerData.supports" class="seller-detail-supports">
              <li class="supports-item" v-for="(item, index) of sellerData.supports" :key="index">
                <span :class="['icon', classMap[sellerData.supports[index].type]]"></span>
                <span class="text">{{sellerData.supports[index].description}}</span>
              </li>
            </ul>

            <div class="seller-detail-title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>

            <div class="seller-detail-description">
              <p class="text">{{ sellerData.bulletin }}</p>
            </div>
          </div>
        </div>

        <div class="close-detail">
          <i class="icon-close" @click="toggleSellerDetail"></i>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import BaseStar from 'v-parts/BaseStar'

export default {
  components: {
    BaseStar
  },
  props: {
    sellerData: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      showSellerDetail: false
    }
  },

  methods: {
    toggleSellerDetail () {
      this.showSellerDetail = !this.showSellerDetail
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
