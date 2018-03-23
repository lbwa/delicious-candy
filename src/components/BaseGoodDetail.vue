<template>
<transition name="move">
  <div class="good-detail" v-show="showDetail">
    <div class="good-detail-content">

      <div class="image-header">
        <img :src="selectedGood.image" alt="good-image">
        <div class="back-btn" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>

      <div class="detail-content scale">
        <h1 class="title">{{ selectedGood.name }}</h1>
        <span class="sell-count">月售{{ selectedGood.sellCount }}份</span>
        <span class="sell-rating">好评率{{ selectedGood.rating }}%</span>

        <div class="good-price">
          <span class="now-price">￥{{ selectedGood.price }}</span>
          <span class="old-price" v-show="selectedGood.oldPrice">￥{{ selectedGood.oldPrice }}</span>
        </div>
      </div>

    </div>
  </div>
</transition>
</template>

<script>
export default {
  props: {
    selectedGood: {
      type: Object
    }
  },

  data () {
    return {
      showDetail: false
    }
  },

  methods: {
    show () {
      this.showDetail = true
    },

    hide () {
      this.showDetail = false
    }
  }
}
</script>

<style lang="scss">
@import '~v-style/utils.scss';

.good-detail {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;  // 留出购物车 tab 空间
  z-index: 30;  // z-index 小于 购物车详情页
  width: 100%;
  background: #ffffff;
  &.move-enter-active, &.move-leave-active {
    transition: all .5s ease
  }
  &.move-enter, &.move-leave-to {
    transform: translateX(100%)
  }
  .image-header {
    position: relative;
    width: 100%;
    height: 0;
    // https://drafts.csswg.org/css-box/#property-index
    // https://www.w3.org/TR/CSS21/box.html#padding-properties
    // w3c 标准中，padding/margin 取值百分数计算最后结果是相对与包含块（最近父元素）的 width 值，即使是 top/bottom 也是一样
    // 此处是基于父元素 .good-detail-content 的宽度计算，因为 .good-detail 设置 width 为 100% ，那么 .good-detail-content 的宽度加上其 margin 和 padding 值（如有）等于此刻 .good-detail 的计算后的值。
    padding-top: 100%;  // 由 padding 撑开父元素，达到自适应 1:1 图像展示
    img {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
    .back-btn {
      position: absolute;
      top: 10px;
      left: 0;
      font-size: 0;
      color: #ffffff;
      .icon-arrow_lift {
        display: inline-block;
        padding: 10px;
        font-size: $micro;
      }
    }
  }
  .detail-content {
    font-size: 0;
    padding: 18px;
    @include bottom-1px(rgba($color-bgc, 0.1));
    .title {
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 700;
      color: $color-bgc;
      line-height: 14px;
    }
    .sell-count, .sell-rating {
      font-size: 10px;
      color: rgb(147, 153, 159);
      line-height: 10px;
    }
    .sell-count {
      margin-right: 12px;
    }
  }
  .good-price {
    margin-top: 18px;
    .now-price {
      margin-right: 8px;
      font-size: 14px;
      font-weight: 700;
      color: rgb(240, 20, 20);
      line-height: 24px;
    }
    .old-price {
      text-decoration: line-through;
      font-size: 10px;
      color: rgb(147, 153, 159);
      line-height: 24px;
    }
  }
}
</style>
