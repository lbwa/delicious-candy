<template>
  <div class="cart-btn">
    <transition name="move">
      <div
      class="cart-decrease"
      v-show="good.quantity > 0"
      @click.stop.prevent="subtractItem">
      <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>

    <div class="cart-quantity" v-show="good.quantity > 0">{{ good.quantity }}</div>
    <div class="cart-increase icon-add_circle" @click.stop.prevent="addItem"></div><!-- .stop.prevent 阻止事件冒泡弹出商品详情页 -->
  </div>
</template>

<script>
import EventBus from '@/EventBus'

export default {
  props: {
    singleGood: {  // 来自 ContentGoodsCart 或 ContentGoods
      type: Object
    }
  },

  computed: {
    good () {
      // https://cn.vuejs.org/v2/guide/components.html#单向数据流
      // 如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。即向 props 传递的对象添加或删除属性将  会影响  父组件
      return this.singleGood  // Object.assign({}, this.singleGood) 不可行
    }
  },

  methods: {
    addItem () {
      // https://cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项
      // Vue 本身不能够响应（监听）对象的属性的添加（删除），除非使用 Vue.set( object, key, value )或 Vue.delete( target, key ) 方法。
      if (!this.good.quantity) {
        // this.$set(object, key, value) 是 Vue.set() 的别名
        this.$set(this.good, 'quantity', 1)
      } else {
        this.good.quantity += 1
      }
      EventBus.$emit('activateAnimation', event.target)  // contentGoodsCart.vue 监听
    },

    subtractItem () {
      if (this.good.quantity === 0) {
        return
      }
      this.good.quantity -= 1
    }
  }
}
</script>

<style lang="scss">
@import '~v-style/utils.scss';

.cart-btn {
  font-size: 0;
  .cart-decrease, .cart-quantity, .cart-increase, .inner {
    display: inline-block;
  }
  .cart-increase {
    padding: 6px;
    line-height: $huge/2;
    font-size: $huge/2;
    color: rgb(0, 160, 220)
  }
  .cart-decrease {
    padding: 6px;
    opacity: 1;
    transform: translate3d(0, 0, 0); // 无实际效果，仅用于开启硬件加速使得动画更流畅
    .inner {
      line-height: $huge/2;
      font-size: $huge/2;
      color: rgb(0, 160, 220);
      transition: all 0.4s linear;
      transform: rotate(0);
    }
    &.move-enter-active, &.move-leave-active {
      transition: all 0.4s linear;
    }
    &.move-enter, &.move-leave-to {
      opacity: 0;
      transform: translate3d(24px, 0, 0);
      .inner {
        transform: rotate(180deg)
      }
    }
  }
  .cart-quantity {
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    text-align: center;
    font-size: $micro/2;
    line-height: $huge/2;
    color: rgb(147, 153, 159)
  }
}
</style>
