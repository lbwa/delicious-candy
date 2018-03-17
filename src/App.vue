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
      seller: {} // props 验证对象的初始值与传递值类型必须一致，否则就算传递正确类型也会报错。因为 props 验证也包括初始值类型验证
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
