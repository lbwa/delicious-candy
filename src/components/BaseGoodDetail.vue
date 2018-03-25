<template>
<transition name="move">
  <div class="good-detail" v-show="showDetail" ref="detail"><!-- 滚动区域的容器 -->
    <div class="good-detail-content">

      <div class="image-header">
        <img :src="selectedGood.image" alt="good-image">
        <div class="back-btn" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>

      <div class="detail-content">
        <h1 class="title">{{ selectedGood.name }}</h1>
        <span class="sell-count">月售{{ selectedGood.sellCount }}份</span>
        <span class="sell-rating">好评率{{ selectedGood.rating }}%</span>

        <div class="good-price">
          <span class="now-price">￥{{ selectedGood.price }}</span>
          <span class="old-price" v-show="selectedGood.oldPrice">￥{{ selectedGood.oldPrice }}</span>
        </div>
        <!-- 根据 selectedGood 的 quantity 是否存在或为 0 来控制显示 -->
        <transition name="fade">
          <div class="add-good-btn" v-show="!selectedGood.quantity || selectedGood.quantity === 0" @click="addToCart">加入购物车</div>
        </transition>
        <div class="add-good-btn1-wrapper" v-show="selectedGood.quantity">
          <BaseCartBtn :singleGood="selectedGood"  ref="btn"/>
        </div>
      </div>

      <BaseSplit  v-show="selectedGood.info"/>

      <div class="good-info" v-show="selectedGood.info">
        <h1 class="title">商品介绍</h1>
        <p class="content">{{ selectedGood.info }}</p>
      </div>

      <BaseSplit/>

      <div class="good-ratings">
        <h1 class="title">商品评价</h1>
        <BaseRatingsSelector
        :ratings="selectedGood.ratings"
        :selectedType="selectedType"
        :desc="{ all:'全部', positive:'推荐', negative:'吐槽'}"
        @filterRatingsType="toggleRatingsType"
        @fullContent="toggleFullContent"
        />
        <!-- 单个商品评论区 -->
        <div class="ratings-wrapper">
          <ul>
            <li
            class="ratings-item scale"
            v-for="(item, index) of filterRatings"
            :key="index"
            v-show="filterFullContent(item.rateType, item.text)"
            >
              <div class="rate-time">{{ (new Date(item.rateTime)).toLocaleString()}}</div>
              <div class="user">
                <span class="user-name">{{ item.username }}</span>
                <img :src="item.avatar" alt="user-avatar" width="12" height="12">
              </div>
              <p class="ratings-text">
                <span class="icon-thumb_up" v-if="item.rateType !== 1"></span>
                <span class="icon-thumb_down" v-else></span>
                <span class="ratings-text-content">{{ item.text }}</span>
              </p>
            </li>

            <li class="empty-rating" v-show="!selectedGood.ratings || !selectedGood.ratings.length">暂无评价</li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</transition>
</template>

<script>
import BetterScroll from 'better-scroll'
import BaseCartBtn from './BaseCartBtn'
import BaseSplit from './BaseSplit'
import BaseRatingsSelector from './BaseRatingsSelector'

const POSITIVE = 0  // 单个商品的 rateType 值
const NEGATIVE = 1
const ALL = 2

export default {
  props: {
    selectedGood: {
      type: Object
    }
  },

  components: {
    BaseCartBtn,
    BaseSplit,
    BaseRatingsSelector
  },

  data () {
    return {
      showDetail: false,
      selectedType: ALL,  // 当前选中评论类型
      fullContent: false  // 排除空评论
    }
  },

  computed: {
    filterRatings () {
      if (this.selectedType === ALL) {
        return this.selectedGood.ratings
      } else if (this.selectedType === POSITIVE) {
        return this.selectedGood.ratings.filter(item => item.rateType === POSITIVE)
      } else {
        return this.selectedGood.ratings.filter(item => item.rateType === NEGATIVE)
      }
    }
  },

  methods: {
    show () {
      this.showDetail = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BetterScroll(this.$refs.detail, {
            click: true
          })
        } else {
          this.scroll.refresh() // 重新计算 this.$refs.detail 高度
        }
      })
    },

    hide () {
      this.showDetail = false
    },

    addToCart (event) {
      this.$refs.btn.addItem(event)
    },

    toggleRatingsType (type) {
      this.selectedType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },

    toggleFullContent (param) {
      this.fullContent = param
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },

    filterFullContent (type, text) {
      if (this.fullContent && !text) {
        return false
      }
      return true
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
    position: relative;
    font-size: 0;
    padding: 18px;
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
    .add-good-btn, {
      position: absolute;
      right: 18px;
      bottom: 18px;
      background-color: rgb(0, 160, 220);
      height: 24px;
      width: 74px;
      box-sizing: border-box;
      padding: 0 12px;
      border-radius: 12px;
      color: $color-empty;
      font-size: 10px;
      text-align: center;
      line-height: 24px;
      &.fade-enter-active, &.fade-leave-active {
        transition: all .1s linear
      }
      &.fade-enter, &.fade-leave-to {
        opacity: 0;
      }
    }
    .add-good-btn1-wrapper {
      position: absolute;
      right: 12px;  // BaseCartBtn 有 6px 的内边距
      bottom: 12px;
    }
  }
  .good-info {
    padding: 18px;
    font-size: 0;
    .title {
      font-size: 14px;
    }
    .content {
      margin-top: 6px;
      padding: 0 8px 0 8px;
      font-size: 12px;
      font-weight: 200;
      color: rgb(77, 85, 93);
      line-height: 24px;
    }
  }
  .good-ratings {
    padding-top: 18px;
    font-size: 0;
    .title {
      margin: 0 18px;
      font-size: 14px;
    }
    .ratings-wrapper {
      padding: 0 18px;
      .ratings-item {
        position: relative;
        padding: 16px 0;
        @include bottom-1px(rgba($color-bgc, .1));
        &:last-child {
          @include border-none;
        }
        .rate-time {
          margin-bottom: 6px;
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 12px;
        }
        .user {
          position: absolute;
          top: 16px;
          right: 0;
          .user-name {
            display: inline-block;
            vertical-align: top;
            margin-right: 6px;
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 12px;
          }
          img {
            vertical-align: top;
            border-radius: 6px;
          }
        }
        .ratings-text {
          .icon-thumb_up, .icon-thumb_down, .ratings-text-content {
            font-size: 12px;
          }
          .icon-thumb_up, .icon-thumb_down {
            margin-right: 4px;
            line-height: 16px;
          }
          .icon-thumb_up {
            color: rgba(0, 160, 220, 1);
          }
          .icon-thumb_down {
            color: rgb(147, 153, 159);
          }
          .ratings-text-content {
            line-height: 16px;
            color: rgb(7, 17, 27);
          }
        }
      }
      .empty-rating {
        padding: 16px 0;
        font-size: 12px;
        color: #93999f;
      }
    }
  }
}
</style>
