<template>
  <div class="content-ratings" ref="scroll">
    <div class="ratings-content-wrapper">
      <div class="seller-overview">
        <div class="score">
          <div class="score-content">{{ sellerData.score }}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ sellerData.rankRate }}%</div>
        </div>

        <div class="seller-service">
          <div class="service-score">
            <span class="title">服务态度</span>
            <!-- 初始化时，向 star 组件传入 0 ，因为 ajax 请求为异步-->
            <BaseStar :score="sellerData.serviceScore || 0" :size="36"/>
            <span class="total-score">{{ sellerData.serviceScore }}</span>
          </div>

          <div class="goods-score">
            <span class="title">商品评分</span>
            <BaseStar :score="sellerData.foodScore || 0" :size="36"/>
            <span class="total-score">{{ sellerData.foodScore }}</span>
          </div>

          <div class="delivery-time">
            <span class="title">送达时间</span>
            <span class="content">{{ sellerData.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <BaseSplit/>

      <BaseRatingsSelector
      :ratings="allRatings"
      :selectedType="selectedType"
      :fullContent="fullContent"
      @filterRatingsType="toggleRatingsType"
      @fullContent="toggleFullContent"
      />

      <div class="ratings-detail">
        <ul>
          <li
          class="single-rating scale"
          v-for="(item, index) of filterRatings"
          :key="index"
          v-show="filterFullContent(item.rateType, item.text)"
          >
            <div class="user-avatar">
              <img :src="item.avatar" alt="user-avatar" width="28" height="28">
            </div>
            <div class="content-wrapper">
              <div class="user">
                <div class="user-name">{{ item.username }}</div>
                <BaseStar :score="item.score || 0" :size="24"/>
                <span class="delivery-time" v-if="item.deliveryTime">{{ item.deliveryTime }}分钟送达</span>
              </div>

              <div class="rate-time">{{(new Date(item.rateTime)).toLocaleString()}}</div>

              <p class="rate-content" v-if="item.text">{{ item.text }}</p>

              <ul class="user-recommend" v-if="item.recommend.length !== 0"><!-- 推荐列表-->
                <li class="icon-thumb_up" v-if="item.recommend.length !== 0"></li>
                <li class="item" v-for="(child, childIndex) of item.recommend" :key="childIndex">{{ child }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getRatings } from '@/api'
import BaseSplit from './BaseSplit'
import BaseRatingsSelector from './BaseRatingsSelector'
import BaseStar from './BaseStar'
import BetterScroll from 'better-scroll'

const checkStatus = 0  // 正常 errno 值
const ALL = 2 // rateType 值
const POSITIVE = 0
const NEGATIVE = 1

export default {
  props: {
    sellerData: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      allRatings: [],
      selectedType: ALL,
      fullContent: false
    }
  },

  computed: {
    filterRatings () {
      if (this.selectedType === ALL) {
        return this.allRatings
      } else if (this.selectedType === POSITIVE) {
        return this.allRatings.filter(item => item.rateType === POSITIVE)
      } else {
        return this.allRatings.filter(item => item.rateType === NEGATIVE)
      }
    }
  },

  methods: {
    toggleRatingsType (type) {
      this.selectedType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },

    toggleFullContent () {
      this.fullContent = !this.fullContent
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
  },

  components: {
    BaseSplit,
    BaseRatingsSelector,
    BaseStar
  },

  created () {
    getRatings().then(res => {
      if (res.errno === checkStatus) {
        this.allRatings = res.data
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BetterScroll(this.$refs.scroll, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      } else {
        throw Error(`check errno failed. erron is ${res.errno} !`)
      }
    })
  }
}
</script>

<style lang="scss">
@import '~v-style/utils.scss';
.content-ratings {
  position: absolute;
  top: 174px;
  bottom: 0;  // 确定父元素大小，better-scroll 才能对其第一个子元素生效
  width: 100%;
  overflow: hidden;
  font-size: 0;
  .seller-overview {
    display: flex;
    padding: 18px 0;
    .score {
      flex: 0 0 137px;
      padding: 6px 0;
      text-align: center;
      border-right: 1px solid rgba($color-normal, .1);
      @media only screen and (max-width: 320px) {
        flex: 0 0 120px;
        width: 120px;
      }
      .score-content {
        margin-bottom: 6px;
        font-size: 24px;
        color: rgb(255, 153, 0);
        line-height: 28px;
      }
      .title {
        margin-bottom: 8px;
        font-size: 12px;
        color: $color-bgc;
        line-height: 12px;
      }
      .rank {
        margin-bottom: 6px;
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 10px;
      }
    }
    .seller-service {
      flex: 1;
      padding: 6px 0 6px 24px;
      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }
      .title {
        font-size: 12px;
        color: $color-bgc;
        line-height: 18px;
      }
      .total-score {
        font-size: 12px;
        color: rgb(255, 153, 0);
        line-height: 18px;
      }
      .star-rate {
        display: inline-block;
        margin: 0 12px;
        vertical-align: top;
      }
      .service-score, .goods-score {
        margin-bottom: 8px;
      }
      .delivery-time {
        .content {
          margin-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);
          line-height: 18px;
        }
      }
    }
  }
  .ratings-detail {
    padding: 0 18px;
    .single-rating {
      display: flex;
      padding: 18px 0;
      @include bottom-1px(rgba($color-bgc, .1));
      .user-avatar {
        img {
        border-radius: 50%;
        }
      }
      .content-wrapper {
        flex: 1;
        position: relative;
        padding-left: 12px;
        .user {
          display: inline-block;
          .user-name {
            font-size: 10px;
            color: $color-bgc;
            line-height: 12px;
            margin-bottom: 4px;
          }
          .star-rate, .delivery-time {
            display: inline-block;
            vertical-align: top;
            margin-bottom: 6px;
          }
          .delivery-time {
            margin-left: 6px;
            font-size: 10px;
            font-weight: 200;
            color: rgb(147, 153, 159);
            line-height: 12px;
          }
        }
        .rate-time {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 10px;
          font-weight: 200;
          color: rgb(147, 153, 159);
          line-height: 12px;
        }
        .rate-content {
          margin-bottom: 8px;
          font-size: 12px;
          color: $color-bgc;
          line-height: 18px;
        }
        .icon-thumb_up {
          display: inline-block;
          margin-right: 8px;
          vertical-align: top;
          font-size: 12px;
          color: $color-button;
          line-height: 16px;
        }
        .user-recommend {
          display: inline-block;
          .item {
            display: inline-block;
            margin: 0 8px 4px 0;  // 下边距是小屏手机上换行时分隔两行
            padding: 0 6px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 40px;
            border: 1px solid rgba($color-bgc, .1);
            border-radius: 2px;
            font-size: 9px;
            color: rgb(147, 153, 159);
            line-height: 16px;
          }
        }
      }
    }
  }
}
</style>
