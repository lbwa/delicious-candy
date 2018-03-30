<template>
  <div id="app">
    <AppHeader :sellerData="sellerDetail"></AppHeader>
    <AppTab></AppTab>
    <keep-alive>
      <router-view :sellerData="sellerDetail"/>
    </keep-alive>
  </div>
</template>

<script>
import AppHeader from 'v-parts/AppHeader'
import AppTab from 'v-parts/AppTab'
import { getSeller } from '@/api'
import { urlParse } from '@/common/js/util.js'

const checkStatu = 0

export default {
  components: {
    AppHeader,
    AppTab
  },

  data () {
    return {

      /**
       * app.vue 中 created 函数是异步请求，那么初始化时第一次传递给 sellerData  的
       * 就是 seller 的初始值，即 {} ，在 created 异步请求返回后，回调函数内 seller
       *  变化，那么重新传递 sellerData 值，此时传递正常数据值。由此，在示例中，初始
       * 化时会props 值会变化两次。因此子组件会检查两次 sellerData 的类型，两次均为
       * Object 才能通过检测，否则报错
       */

      sellerDetail: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      } // 商家信息
    }
  },

  created () {
    // 取得头部商家信息
    getSeller({params: {id: this.sellerDetail.id}}).then(res => {
      if (res.errno === checkStatu) {
        // https://cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项
        // 一定要是创建一个新对象，使其包含原对象属性和新属性。直接将新属性添加至原对象是无法触发数据更新的
        this.sellerDetail = Object.assign({}, this.sellerDetail, res.data)
      } else {
        throw Error(`Check errno failed, errno is ${res.errno} !`)
      }
    })
  }
}

</script>

<style lang="scss">
@import '~@/common/reset/reset.scss';
@import '~v-style/utils.scss';

// media 查询前缀，需要手动添加，postcss 的 autoprefixer 不会补全 media 查询条件

@media (min-device-pixel-ratio: 1.5), (-webkit-min-device-pixel-ratio: 1.5) {
  .scale {
    &:after {
      transform: scaleY(0.7);  // 1.5 * 0.7 约等于 1 像素
    }
  }
};

@media (min-device-pixel-ratio: 2), (-webkit-min-device-pixel-ratio: 2) {
  .scale {
    &:after {
      transform: scaleY(0.5);
    }
  }
};

body, html {
  font-family: PingFang SC, Arial, Helvetica, sans-serif;
  font-weight: $font-weight-normal;
}

.clearfix {
  display: inline-block;
  &:after {
    display: block;
    content: '.';
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
}
</style>
