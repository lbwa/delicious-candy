<template>
  <div class="content-seller" ref="scroll">
    <div class="content-wrapper">

      <div class="header-wrapper">

        <div class="seller scale">
          <h1 class="seller-name">{{ sellerData.name }}</h1>
          <BaseStar :score="sellerData.score || 0" :size="36"/>
          <span class="ratings-count">({{ sellerData.ratingCount }})</span>
          <span class="sell-count">月售{{ sellerData.sellCount }}单</span>

          <div
          class="collection-btn"
          @click="addToCollected"
          >
            <div :class="['icon-favorite', hasCollected ? 'active' : '']"></div>
            <div class="text">{{ collectedContent }}</div>
          </div>
        </div>

        <div class="remark">
          <div class="min-price">
            <h1 class="title">起送价</h1>
            <div class="content">{{ sellerData.minPrice}}<span class="extra">元</span></div>
          </div>
          <div class="delivery-price">
            <h1 class="title">商家配送</h1>
            <div class="content">{{ sellerData.deliveryPrice }}<span class="extra">元</span></div>
          </div>
          <div class="delivery-time">
            <h1 class="title">平均配送时间</h1>
            <div class="content">{{ sellerData.deliveryTime }}<span class="extra">分钟</span></div>
          </div>
        </div>

      </div>

      <BaseSplit/>

      <div class="seller-bulletin">
        <div class="bulletin-header scale">
          <h1 class="title">公告与活动</h1>
          <p class="content">{{ sellerData.bulletin }}</p>
        </div>
        <ul class="bulletin-supports">
          <li
          class="supports-item scale"
          v-for="(item, index) of sellerData.supports"
          :key="index"
          >
            <span :class="['icon', classMap[item.type]]"></span>
            <span class="supports-content">{{ item.description }}</span>
          </li>
        </ul>
      </div>

      <BaseSplit/>

      <div class="seller-img">
        <h1 class="title">商家实景</h1>
        <div class="img-list-wrapper" ref="imgs">
          <ul class="img-list" ref="imgsList">
            <li class="img-item" v-for="(item, index) of sellerData.pics" :key="index">
              <img :src="item" alt="seller-pics" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>

      <BaseSplit/>

      <div class="seller-info">
        <h1 class="title scale">商家信息</h1>
        <ul class="info-list">
          <li class="info-item scale" v-for="(item, index) of sellerData.infos" :key="index">{{ item }}</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import BaseSplit from './BaseSplit'
import BaseStar from './BaseStar'
import BetterScroll from 'better-scroll'

export default {
  props: {
    sellerData: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      hasCollected: false,
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },

  computed: {
    collectedContent () {
      return this.hasCollected ? `已收藏` : `收藏`
    }
  },

  methods: {
    addToCollected () {
      this.hasCollected = !this.hasCollected
    },

    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BetterScroll(this.$refs.scroll, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },

    _initImgScroll () {
      if (this.sellerData.pics) {
        let imgWidth = 120
        let imgMargin = 6
        let totalWidth = (imgWidth + imgMargin) * this.sellerData.pics.length - imgMargin
        this.$refs.imgsList.style.width = `${totalWidth}px`
        this.$nextTick(() => {
          if (!this.imgScroll) {
            this.imgScroll = new BetterScroll(this.$refs.imgs, {
              click: true,
              scrollX: true,  // 开启横向滚动
              eventPassthrough: 'vertical'  // 保留原生纵向滚动
            })
          } else {
            this.imgScroll.refresh()
          }
        })
      }
    }
  },

  watch: {
    sellerData () {  // 初始化组件时，第一次传入空对象，第二次传入接受的 ajax 数据
      this.$nextTick(() => {
        this._initScroll()
        this._initImgScroll()
      })
    }
  },

  activated () { // 在 keep-alive 中的组件被激活时调用, keep-alive 见 App.vue
    this.$nextTick(() => {
      this._initScroll()
      this._initImgScroll()
    })
  },

  components: {
    BaseStar,
    BaseSplit
  }
}
</script>

<style lang="scss">
@import '~v-style/utils.scss';
.content-seller {
  position: absolute;  // 相对于 body 绝对定位
  top: 174px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  font-size: 0;
  .header-wrapper {
    padding: 18px;
    .seller {
      position: relative;
      padding-bottom: 18px;
      @include bottom-1px(rgba($color-bgc, .1));
      .seller-name {
        margin-bottom: 8px;
        font-size: 14px;
        color: $color-bgc;
        line-height: 14px;
      }
      .star-rate, .ratings-count, .sell-count {
        display: inline-block;
        vertical-align: top;
      }
      .ratings-count, .sell-count {
        font-size: 10px;
        color: $color-normal;
        line-height: 18px;
      }
      .ratings-count {
        margin-left: 8px;
      }
      .sell-count {
        margin-left: 12px;
      }
      .collection-btn {
        position: absolute;
        top: 0;
        right: 0;
        text-align: center;
        width: 30px;  // 定宽防止弹跳
        .icon-favorite {
          font-size: 24px;
          color: #d4d6d9;
          margin-bottom: 4px;
          &.active {
            color: rgba(240, 20, 20, 1);
          }
        }
        .text {
          font-size: 10px;
          color: $color-normal;
          line-height: 10px;
        }
      }
    }
    .remark {
      padding-top: 18px;
      display: flex;
      text-align: center;
      .min-price, .delivery-price, .delivery-time {
        flex: 1;
        .title {
          margin-bottom: 4px;
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
        }
        .content {
          font-size: 24px;
          font-weight: 200;
          color: $color-bgc;
          line-height: 24px;
          .extra {
            font-size: 10px;
          }
        }
      }
      .min-price, .delivery-price {
        border-right: 1px solid rgba($color-bgc, .1);
      }
    }
  }
  .seller-bulletin {
    padding: 0 18px;
    .bulletin-header {
      padding: 18px 0 16px 0;
      @include bottom-1px(rgba($color-bgc, .1));
      .title {
        margin-bottom: 8px;
        font-size: 14px;
        color: $color-bgc;
        line-height: 14px;
      }
      .content {
        padding: 0 12px;
        font-size: 12px;
        font-weight: 200;
        color: rgb(240, 20, 20);
        line-height: 24px;
      }
    }
    .bulletin-supports {
      .supports-item {
        padding: 16px 12px;
        @include bottom-1px(rgba($color-bgc, .1));
        &:last-child {
          @include border-none;
        }
        .icon {  // 与 ContentGoods 中相同
          display: inline-block;
          vertical-align: top;
          width: 16px;
          height: 16px;
          margin-right: 6px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-img('~@/assets/ContentSeller/decrease_4');
          }
          &.discount {
            @include bg-img('~@/assets/ContentSeller/discount_4');
          }
          &.guarantee {
            @include bg-img('~@/assets/ContentSeller/guarantee_4');
          }
          &.invoice {
            @include bg-img('~@/assets/ContentSeller/invoice_4');
          }
          &.special {
            @include bg-img('~@/assets/ContentSeller/special_4');
          }
        }
        .supports-content {
          line-height: 16px;
          font-size: 12px;
          font-weight: 200;
          color: $color-bgc;
        }
      }
    }
  }
  .seller-img {
    padding: 18px;
    .title {
      margin-bottom: 12px;
      font-size: 14px;
      color: $color-bgc;
      line-height: 14px;
    }
    .img-list-wrapper {
      position: relative;
      width: 100%;
      padding-top: percentage(90 / 378);  // 占用图片高度，防止图像加载完成造成的闪烁，需要与父元素 相对定位 和子元素 的绝对定位配合使用
      overflow: hidden;
      white-space: nowrap;
      .img-list {
        position: absolute;
        top: 0;
        left: 0;
        .img-item {
          display: inline-block;
          margin-right: 6px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .seller-info {
    padding: 0 18px;
    .title {
      padding: 18px 0 12px 0;
      @include bottom-1px(rgba($color-bgc, .1));
      font-size: 14px;
      color: $color-bgc;
      line-height: 14px;
    }
    .info-item {
      padding: 16px 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      @include bottom-1px(rgba($color-bgc, .1));
      &:last-child {
        @include border-none;
      }
      font-size: 12px;
      font-weight: 200;
      color: $color-bgc;
      line-height: 16px;
    }
  }
}
</style>
