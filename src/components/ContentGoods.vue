<template>
  <div class="content-goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
        :class="['menu-item', {'current': currentIndex === index}]"
        v-for="(item, index) of goodsDetail"
        :key="index"
        @click="selectMenu(index)">
          <span class="text scale">
            <span :class="['icon', classMap[item.type]]" v-show="item.type>0" />{{item.name}}
          </span>
        </li>
      </ul>
    </div>

    <div class="goods-wrapper" ref="goodsWrapper">
      <ul>
        <li v-for="(parentItem, index) of goodsDetail" :key="index" class="goods-list" ref="goodsList">
          <h1 class="title">{{ parentItem.name }}</h1>
          <ul>
            <li v-for="(item, index) of parentItem.foods" :key="index" class="goods-item scale">

              <div class="goods-icon">
                <img :src="item.icon" alt="goods-icon" width="57px" height="57px">
              </div>

              <div class="goods-content">
                <h2 class="goods-name">{{ item.name }}</h2>
                <p class="goods-description">{{ item.description }}</p>

                <div class="goods-extra">
                  <span class="sell-count">月售{{ item.sellCount }}份</span>
                  <span class="sell-rating">好评率{{ item.rating }}%</span>
                </div>

                <div class="goods-price">
                  <span class="new-price">￥{{ item.price }}</span>
                  <span class="old-price" v-show="item.oldPrice">￥{{ item.oldPrice }}</span>
                </div>
              </div>

            </li>
          </ul>
        </li>
      </ul>
    </div>

    <GoodsCart :sellerData="sellerData"></GoodsCart>

  </div>
</template>

<script>
import { getGoods } from '@/api'
import BetterScorll from 'better-scroll'
import GoodsCart from 'v-parts/ContentGoodsCart'

const checkStatu = 0

export default {
  props: {
    sellerData: {
      type: Object,
      required: true
    }
  },

  // computed: {

  //   /**
  //     * 此处 goodsDetail 不应处理为 data 对象，因为在初始化时，GoodsData 为初始值
  //     * （空数组，在 App.vue 中定义），data 对象不会响应 props 的变化，那么初始页面将
  //     * 为空白，故设定计算属性来处理 props 对象的传入值
  //     * 注：因为初始化时，ajax 为异步请求，故第一次传入的是初始值
  //     */

  //   goodsDetail () {
  //     return this.GoodsData
  //   }
  // },

  data () {
    return {
      goodsDetail: [],
      listHeight: [],
      scrollY: 0 // 当前滑动位置
    }
  },

  components: {
    GoodsCart
  },

  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i  // 将 i 与当前元素 v-for 中 index 比较即可得到当前类别
        }
      }
      return 0
    }
  },

  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    // 取得商品信息
    getGoods.then(res => {
      if (res.errno === checkStatu) {
        this.goodsDetail = res.data

        /**
          *new BetterScroll()时需要操作 DOM 获取目标元素标签（）的高度，而 Vue.js 是
          *异步更新 DOM，即只有在下一个 Tick 时才更新 DOM ，此时才能正确计算目标元素
          *的高度
          *https://vuejs.org/v2/guide/reactivity.html#Async-Update-Queue
          */

        this.$nextTick(() => {
          // 一定要在 DOM 更新之后操作 DOM 才有效
          this._initScroll()
          this._calculateHeight()
        })
      } else {
        throw Error(`Error: Response errno is ${res.errno}, please fix it !`)
      }
    })
  },

  methods: {
    // Better-Scroll 监听了点击（touchstart / touchend事件行为），阻止默认事件行为。因此要正常监听 click 事件，要在初始化 BetterScroll 时传入参数 click: true
    // https://github.com/ustbhuangyi/better-scroll/blob/fbf3d130aa0ccaedee67bd6ff1b21844d8217012/doc/zh-hans/options.md#click
    selectMenu (index) { // 传入点击的 index
      let goodsList = this.$refs.goodsList
      let el = goodsList[index]
      this.goodsScroll.scrollToElement(el, 100)
    },

    _initScroll () {
      this.menuScroll = new BetterScorll(this.$refs.menuWrapper, {
        click: true
      })
      this.goodsScroll = new BetterScorll(this.$refs.goodsWrapper, {
        probeType: 3 // 在滚动时实时监测位置
      })
      this.goodsScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y))  // 存储当前 y 坐标
      })
    },

    _calculateHeight () {
      let goodsList  = this.$refs.goodsList  // 所有 menu 类别组成的数组
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < goodsList.length; i++) {
        let item = goodsList[i]
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientHeight
        // element.clientHeight = height + padding - 水平滚动条
        // 循环得到每个 menu 类别元素的高度，得到锚点位置，在 listHeight 数组记录锚点
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
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
      width: 80px; // 兼容某些安卓浏览器
      background: #f3f5f7;
      .menu-item {
        display: table; // 在可能有多行的情况下，table 布局能良好的保持垂直居中
        height: 54px;
        width: 56px;
        padding: 0 12px;
        line-height: 14px;
        &.current {
          position: relative;
          z-index: 10px;
          margin-top: -1px;
          background: #ffffff;
          font-weight: 700;
          .text {
            @include border-none()
          }
        }
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
      font-size: 0;
      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background-color: #f3f5f7;
      }
      .goods-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        @include bottom-1px(rgba($color-bgc, 0.1));
        &:last-child {
          @include border-none();
          margin-bottom: 0;
        }
        .goods-icon {
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .goods-content {
          flex: 1;
          color: rgb(147, 153, 159);
          .goods-name {
            margin: 2px 0 8px 0;
            height: $mid/2;
            line-height: $mid/2;
            font-size: $mid/2;
            color: $color-bgc;
          }
          .goods-description {
            margin: 8px 0;
            line-height: 12px;
            font-size: $micro/2;
          }
          .goods-extra {
            font-size: 0;
            // line-height: 12px;
          }
          .sell-count {
            font-size: $micro/2;
            margin-right: 12px;
          }
          .sell-rating {
            font-size: $micro/2;
          }
          .goods-price {
            font-weight: 700;
            .new-price {
              margin-right: 8px;
              line-height: $small;
              font-size: $mid/2;
              color: rgb(240, 20, 20);
            }
            .old-price {
              text-decoration: line-through;
              font-size: $micro/2;
              font-weight: normal;
            }
          }
        }
      }
    }
  }

</style>
