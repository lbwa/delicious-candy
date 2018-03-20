<template>
  <div class="goods-cart">
    <div class="cart-content">
      <div class="cart-content-left">

        <div class="logo-wrapper">
          <div class="logo-content">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>

        <div class="total-price">￥</div>
        <div class="cart-description">另需配送费￥{{ this.chartDetail.deliveryPrice}}元</div>

      </div>

      <div class="cart-content-right"></div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    sellerData: {
      type: Object,
      required: true
    }
  },

  computed: {
    chartDetail () {
      return this.sellerData
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
          .icon-shopping_cart {
            display: inline-block;
            font-size: $huge/2;
            color: #80858a;
            line-height: 44px;
          }
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
      }
      .cart-description {
        display: inline-block;
        font-size: $big/2;
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
    }
  }
}
</style>
