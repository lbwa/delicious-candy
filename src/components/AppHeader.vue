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
              <!-- 因为初始化时 ajax 为异步请求故设置初始值 0，防止报错 undefined -->
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
@import '../common/style/utils.scss';

.app-header {
  position: relative;
  background: rgba($color-bgc, 0.5);
  color: $color-empty;
  overflow: hidden;  // 消除滤镜露出阴影
  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0; // 消除容器元素中各个元素之间的空白，与子元素 font-size 配合使用
    .avatar {
      display: inline-block;
      vertical-align: top;  // 把元素顶端与整行的顶端对齐
      img {
        border-radius: 2px;
      }
    }
    .content-text {
      display: inline-block;
      margin-left: 16px;
      .text-title {
        margin: 2px 0 8px 0;
        .brand {
          display: inline-block;
          vertical-align: top;  // 把元素顶端与整行的顶端对齐
          width: 30px;
          height: 18px;
          @include bg-img('~@/assets/AppHeader/brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .seller-name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      };
      .text-description {
        margin-bottom: 10px;
        font-size: $small/2;
        line-height: $small/2;
      }
      .text-support {
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-img('~@/assets/AppHeader/decrease_1');
          }
          &.discount {
            @include bg-img('~@/assets/AppHeader/discount_1');
          }
          &.guarantee {
            @include bg-img('~@/assets/AppHeader/guarantee_1');
          }
          &.invoice {
            @include bg-img('~@/assets/AppHeader/invoice_1');
          }
          &.special {
            @include bg-img('~@/assets/AppHeader/special_1');
          }
        }
        .support-text {
          line-height: 12px;
          font-size: $micro/2;
        }
      }
    }
    .support-count {
      position: absolute;
      right: $small/2;
      bottom: $mid/2;
      border-radius: 16px;
      height: $small;
      padding: 0 8px;
      line-height: $small;
      background: rgba($color-full, 0.2);
      font-weight: $font-weight-normal;
      .count {
        font-size: $micro/2;
        margin-right: 2px;
        vertical-align: top;
      }
      .icon-keyboard_arrow_right {
        font-size: $micro/2;
        line-height: $small;
        vertical-align: top;
      }
    }
  }
  .bulletin-wrapper {
    position: relative;
    padding: 0 22px 0 12px;
    height: $mid;
    line-height: $mid;
    background: rgba($color-bgc, 0.2);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    .bulletin-icon {
      display: inline-block;
      vertical-align: top;
      margin-top: 8px;
      width: 22px;
      height: 12px;
      font-size: $micro/2;
      @include bg-img('~@/assets/AppHeader/bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }
    .bulletin-text {
      font-size: $micro/2;
      margin: 0 4px;
      vertical-align: top;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      right: 12px;
      top: 8px;
      font-size: $micro/2;
    }
  }
  .app-header-bg {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: -99;
    filter: blur(10px)  // 模糊效果
  }
  .seller-detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto; // hidden 当内容超过屏幕高度将不能滚动
    background: rgba($color-bgc, 0.8);
    backdrop-filter: blur(10px);  // ，模糊背景，仅在手机端有效
    // 动画开始
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }
    &.fade-enter-active, &.fade-leave-active {
      transition: all .5s ease;
    }
    // 动画结束
    .detail-wrapper {
      min-height: 100%;
      width: 100%;
      .seller-detail-main {
        margin-top: 64px;
        padding-bottom: 64px; // 必须是 padding 给 footer 留出空间,css sticky footer 的关键
        font-size: 0;
        text-align: center;
        .seller-name {
          font-size: $big/2;
          font-weight: bold;
          color: rgba($color-empty, 1);
          line-height: $big/2;
        }
        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
        }
        .seller-detail-title {
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;
          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba($color-empty, 0.2)
          }
          .text {
            padding: 0 12px;
            font-size: $mid/2;
            font-weight: bold;
          }
        }
        .seller-detail-supports {
          width: 80%;
          margin: 0 auto;
          text-align: left;
          .supports-item {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: top;
              margin-right: 6px;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              &.decrease {
                @include bg-img('~@/assets/AppHeader/decrease_2');
              }
              &.discount {
                @include bg-img('~@/assets/AppHeader/discount_2');
              }
              &.guarantee {
                @include bg-img('~@/assets/AppHeader/guarantee_2');
              }
              &.invoice {
                @include bg-img('~@/assets/AppHeader/invoice_2');
              }
              &.special {
                @include bg-img('~@/assets/AppHeader/special_2');
              }
            }
            .text {
              line-height: 16px;
              font-size: 12px;
            }
          }
        }
        .seller-detail-description {
          width: 80%;
          margin: 0 auto;
          text-align: left;
          .text {
            font-size: 12px;
            padding: 0 12px;
            line-height: 24px;
          }
        }
      }
    }
    .close-detail {
      position: relative;
      height: 32px;
      width: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
    }
  }
}
</style>
