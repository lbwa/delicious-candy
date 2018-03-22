<template>
  <div class="goods-cart">
    <div class="cart-content">
      <div class="cart-content-left">

        <div class="logo-wrapper">
          <div :class="['logo-content', totalCount ? 'cart-not-empty' : '']">
            <i :class="['icon-shopping_cart', totalCount ? 'cart-not-empty' : '']"></i>
          </div>
          <div class="select-total-count" v-show="totalCount !== 0">{{ totalCount }}</div>
        </div>

        <div :class="['total-price', totalPrice ? 'cart-not-empty' : '']">￥{{ totalPrice }}</div>
        <div class="cart-description">另需配送费￥{{ deliveryPrice }}元</div>

      </div>

      <div :class="['cart-content-right', totalPrice >= minPrice ? 'cancel-limit' : '']">
        <span
        :class="['submit-order', totalPrice >= minPrice ? 'cancel-limit' : '']"
        >{{ totalPriceDescription }}</span>
      </div>

    </div>
    <div class="ball-container">
      <div
      v-for="(ball, index) of balls"
      :key="index"
      >
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="dropped">
          <div class="singleBall" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '@/EventBus'

export default {
  props: {
    selectedGoods: {
      type: Array,
      default () {
        return [{
          price: 0, // 单价
          count: 0  // 单个类别商品的选择总数量
        }]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],

      dropBalls: []
    }
  },

  computed: {
    totalPrice () {  // 总价
      let total = 0
      this.selectedGoods.forEach(item => {
        total += item.price * item.count
      })
      return total
    },
    totalCount () {  // 总数量
      let count = 0
      this.selectedGoods.forEach(item => {
        count += item.count
      })
      return count
    },
    totalPriceDescription () {  // 判断提交按钮显示文字
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        return `还差￥${this.minPrice - this.totalPrice} 起送`
      } else {
        return `去结算`
      }
    }
  },

  methods: {
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },

    beforeDrop (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          // 外层在 y 轴偏移
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
          el.style.transform = `translate3d(0, ${y}px, 0)`
          let inner = el.querySelector('.inner-hook')
          // 内层在 x 轴偏移
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },

    dropping (el) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight  // 必须项，手动触发浏览器强制重绘
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.style.transform = 'translate3d(0, 0, 0)'
        let inner = el.querySelector('.inner-hook')
        inner.style.webkitTransform = 'translate3d(0, 0, 0)'
        inner.style.transform = 'translate3d(0, 0, 0)'
      })
    },

    dropped (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  },

  created () {
    EventBus.$on('addItemToCart', this.drop)  // 来自 BaseCartBtn.vue
  }
}
</script>

<style lang="scss">
@import '~v-style/utils.scss';

.goods-cart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
  color: rgba($color-empty, 0.4);
  .cart-content {
    display: flex;
    background: #141d27;
    font-size: 0;
    .cart-content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;
        text-align: center;
        .logo-content {
          height: 100%;
          width: 100%;
          background: #2b343c;
          border-radius: 50%;
          &.cart-not-empty {
            background-color: rgb(0, 160, 220);
          }
          .icon-shopping_cart {
            display: inline-block;
            font-size: $huge/2;
            color: #80858a;
            line-height: 44px;
            &.cart-not-empty {
              color: $color-empty
            }
          }
        }
        .select-total-count {
          position: absolute;
          top: 0;
          right: 0;
          width: $huge/2;
          height: $big/2;
          border-radius: 8px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
          background: #f01414;
          color: $color-empty;
          font-size: 9px;
          font-weight: 700;
          line-height: $big/2;
        }
      }
      .total-price {
        display: inline-block;
        vertical-align: top;
        margin: 12px 12px 0 0;
        line-height: $huge/2;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba($color-empty, .1);
        font-size:$big/2;
        font-weight: 700;
        &.cart-not-empty {
          color: $color-empty;
        }
      }
      .cart-description {
        display: inline-block;
        font-size: $micro/2;
        margin: 12px 12px 0 0;
        line-height: $huge/2;
      }
    }
    .cart-content-right {
      flex: 0 0 105px;
      width: 105px;
      color: #80858a;
      background: #2b343c;
      text-align: center;
      &.cancel-limit {
        background-color: #00b43c;
      }
      .submit-order {
        display: inline-block;
        margin-top: 12px;
        line-height: $huge/2;
        font-size: $small/2;
        vertical-align: top;
        font-weight: 700;
        &.cancel-limit {
          color: $color-empty;
        }
      }
    }
  }
  .ball-container {
    .singleBall {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      &.drop-enter-active {
        transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all .4s linear;  // 此处 transition-timing-function 与cubic-bezier 呼应，变化时间函数值必为线性变化，否则小球轨迹很诡异
        }
      }
    }
  }
}
</style>
