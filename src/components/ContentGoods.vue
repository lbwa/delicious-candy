<template>
  <div class="content-goods">
   <div class="menu-wrapper">
     <ul>
       <li class="menu-item" v-for="(item, index) of goodsDetail" :key="index">
         <span class="text scale">
           <span
           :class="['icon', classMap[item.type]]"
           v-show="item.type>0"/>{{item.name}}
         </span>
       </li>
     </ul>
   </div>
   <div class="goods-wrapper"></div>
  </div>
</template>

<script>

export default {
  props: {
    sellerData: {
      type: Array,
      required: true
    }
  },

  computed: {

    /**
     * 此处 goodsDetail 不应处理为 data 对象，因为在初始化时，sellerData 为初始值
     * （空数组，在 App.vue 中定义），data 对象不会响应 props 的变化，那么初始页面将
     * 为空白，故设定计算属性来处理 props 对象的传入值
     * 注：因为初始化时，ajax 为异步请求，故第一次传入的是初始值
     */

    goodsDetail () {
      return this.sellerData
    }
  },

  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="scss">
@import '~v-style/utils.scss';

.content-goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px; // 等分、缩放、站位空间
    width: 80px;   // 兼容某些安卓浏览器
    background: #f3f5f7;
    .menu-item {
      display: table;  // 在可能有多行的情况下，table 布局能良好的保持垂直居中
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;
      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        &.decrease {
          @include bg-img('~@/assets/ContentGoods/decrease_3');
        }
        &.discount {
          @include bg-img('~@/assets/ContentGoods/discount_3');
        }
        &.guarantee {
          @include bg-img('~@/assets/ContentGoods/guarantee_3');
        }
        &.invoice {
          @include bg-img('~@/assets/ContentGoods/invoice_3');
        }
        &.special {
          @include bg-img('~@/assets/ContentGoods/special_3');
        }
      }
      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        @include bottom-1px(rgba($color-bgc, 0.1));
        font-size: 12px;
      }
    }
  }
  .goods-wrapper {
    flex: 1;
  }
}
</style>
