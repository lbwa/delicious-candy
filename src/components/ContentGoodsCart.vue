<template>
<div class="goods-cart-wrapper">
  <div class="goods-cart">
    <div class="cart-content" @click="toggleCartList">
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

      <div :class="['cart-content-right', totalPrice >= minPrice ? 'cancel-limit' : '']" @click.stop="submitOrder">
        <span
        :class="['submit-order', totalPrice >= minPrice ? 'cancel-limit' : '']"
        >{{ totalPriceDescription }}</span>
      </div>

    </div>
    <!-- 小球 -->
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
    <!-- 所购买物品清单页 -->
    <transition name="fold">
      <div class="cart-list scale" v-show="showList">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="clear-cart" @click="cleaner">清空</span>
        </div>
        <div class="list-content" ref="scroll">
          <ul>
            <li
            class="item"
            v-for="(item, index) of goodsInCart"
            :key="index">
              <div class="name">{{ item.name }}</div>
              <div class="price">
                <span>￥{{ item.price * item.quantity }}</span>
              </div>

              <div class="cart-wrapper">
                <BaseCartBtn :singleGood="item"/>
              </div>

            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>

  <transition name="fade">
    <div class="goods-cart-bg" v-show="showList" @click="toggleCartList"></div>
  </transition>
</div>
</template>

<script>
import EventBus from '@/EventBus'
import BaseCartBtn from 'v-parts/BaseCartBtn'
import BetterScroll from 'better-scroll'

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

  components: {
    BaseCartBtn
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

      dropBalls: [],

      fold: true  // 折叠购物车详情
    }
  },

  computed: {
    goodsInCart () {
      return this.selectedGoods
    },

    totalPrice () {  // 总价
      let total = 0
      this.goodsInCart.forEach(item => {
        total += item.price * item.quantity
      })
      return total
    },

    totalCount () {  // 总数量
      let quantity = 0
      this.goodsInCart.forEach(item => {
        quantity += item.quantity
      })
      return quantity
    },

    totalPriceDescription () {  // 判断提交按钮显示文字
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        return `还差￥${this.minPrice - this.totalPrice} 起送`
      } else {
        return `去结算`
      }
    },

    showList () {
      if (!this.totalCount) {
        return false
      }
      // 最佳实践是 在计算属性中禁止对 data 对象进行修改，否则警告 vue/no-side-effects-in-computed-properties
      let show = !this.fold

      /**
       * 因为 computed 属性设定的角色定位是仅仅是一个 getter ，不包括setter，为不偏
       * 离 getter 的角色定位，故将对 this.scroll 的初始化提炼出为一个方法，通过调用
       * 这个方法来初始化 this.scroll 且不叛离 computed 属性的 getter 角色定位
       *
       * 否则，报错 Unexpected side effect in “showList” computed property
       */

      this.initScroll(show)
      return show
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
    },

    toggleCartList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },

    cleaner () {
      this.fold = true // 还原折叠状态，防止再次添加商品至购物车时直接弹出详情
      // 为了让 Vue Devtools 记录此清除事件
      EventBus.$emit('clearAllSelectedgoods')  // ContentGoods 接收
    },

    // 用于购物车详情页的滚动初始化
    initScroll (show) {
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BetterScroll(this.$refs.scroll, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    },

    submitOrder () {
      if (this.totalPrice < this.minPrice) {
        return
      }
      alert(`总共支付￥${this.totalPrice}元`)
    }
  },

  created () {
    EventBus.$on('activateAnimation', this.drop)  // 来自 BaseCartBtn.vue
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
  .cart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);  // -100% 相对于当前高度做 -100% 偏移
    &.fold-enter-active, &.fold-leave-active {
      transition: all .5s;
    }
    &.fold-enter, &.fold-leave-to {
      transform: translate3d(0, 0, 0);
    }
    .list-header {
      background: #f3f5f7;
      @include bottom-1px(rgba(7, 17, 27, 0.1));
      font-size: 0;
      .title {
        display: inline-block;
        margin-left: 18px;
        vertical-align: top;
        font-size: $mid/2;
        font-weight: 200;
        color: $color-bgc;
        line-height: 40px;
      }
      .clear-cart {
        float: right;
        margin-right: 18px;
        font-size: $small/2;
        color: rgb(0, 160, 220);
        line-height: 40px;
      }
    }
    .list-content {
      background: $color-empty;
      max-height: 217px;
      padding: 0 18px;
      overflow: hidden;
      .item {
        position: relative;
        box-sizing: border-box;
        padding: 12px 0;
        @include bottom-1px(rgba(7, 17, 27, 0.1));
        .name {
          display: inline-block;
          vertical-align: top;
          font-size: $mid/2;
          color: $color-bgc;
          line-height: 24px;
        }
        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          font-size: $mid/2;
          font-weight: 700;
          color: rgb(240, 20, 20);
          line-height: 24px;
        }
        .cart-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}
.goods-cart-bg {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 40;
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);
  backdrop-filter: blur(10px);
  &.fade-enter, &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
  &.fade-enter-active, &.fade-leave-active {
    transition: all .5s
  }
}
</style>
