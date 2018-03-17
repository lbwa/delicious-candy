<template>
  <div id="app">
    <AppHeader :sellerData="seller"></AppHeader>
    <AppTab></AppTab>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import AppHeader from 'v-parts/AppHeader'
import AppTab from 'v-parts/AppTab'
import { getSeller } from '@/api'

const checkStatu = 0

// 子组件数据在共有父组件中集中处理

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

      seller: {} 
    }
  },

  created () {
    getSeller.then(res => {
      if (res.errno === checkStatu) {
        this.seller = res.data
      } else {
        console.log(`Error: Response errno is ${res.errno}, please fix it !`)
      }
    })
  }
}

</script>

<style lang="scss">
@import '~v-style/App.scss'
</style>
