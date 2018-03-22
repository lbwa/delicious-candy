<template>
  <div class="goods-cart">
    <div class="cart-content">
      <div class="cart-content-left">

        <div class="logo-wrapper">
          <div :class="['logo-content', cartTotalQuantity ? 'cart-not-empty' : '']">
            <i :class="['icon-shopping_cart', cartTotalQuantity ? 'cart-not-empty' : '']"></i>
          </div>
          <div class="select-total-count" v-show="cartTotalQuantity !== 0">{{ cartTotalQuantity }}</div>
        </div>

        <div :class="['total-price', cartTotalPrice ? 'cart-not-empty' : '']">￥{{ cartTotalPrice }}</div>
        <div class="cart-description">另需配送费￥{{ deliveryPrice }}元</div>

      </div>

      <div :class="['cart-content-right', cartTotalPrice >= minPrice ? 'cancel-limit' : '']">
        <span
        :class="['submit-order', cartTotalPrice >= minPrice ? 'cancel-limit' : '']"
        >{{ totalPriceDescription }}</span>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    // selectedGoods: {
    //   type: Array,
    //   default () {
    //     return [{
    //       // 后期若要显示具体所选项目，于每个 item 添加一个 id 属性予以记录所选项目
    //       price: 0, // 单价
    //       count: 0  // 单个类别商品的选择总数量
    //     }]
    //   }
    // },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },

  computed: {
    ...mapGetters([
      'cartTotalPrice',
      'cartTotalQuantity'
    ]),
    // totalPrice () {  // 总价
    //   let total = 0
    //   this.selectedGoods.forEach(item => {
    //     total += item.price * item.count
    //   })
    //   return total
    // },
    // totalCount () {  // 总数量
    //   let count = 0
    //   this.selectedGoods.forEach(item => {
    //     count += item.count
    //   })
    //   return count
    // },
    totalPriceDescription () {  // 判断提交按钮显示文字
      if (this.cartTotalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.cartTotalPrice < this.minPrice) {
        return `还差￥${this.minPrice - this.cartTotalPrice} 起送`
      } else {
        return `去结算`
      }
    }
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
}
</style>
