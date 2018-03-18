<template>
  <div class="ratings-star">
    <span class="count-star" v-for="item of IntegerStar" :key="item"></span>
    <span class="count-half-star" v-if="HalfStar"></span>
    <span class="count-off-star" v-for="item of OffStar" :key="`${item}off`"></span>
  </div>
</template>

<script>
export default {
  props: {
    // ajax 是异步请求,在父组件中设置 sellerData.score || 0(初始 score 值为 0)
    score: {
      type: Number,
      require: true
    }
  },

  data () {
    return {
      totalStar: 5 // 总星数
    }
  },

  computed: {
    IntegerStar () {
      return Math.floor(this.score)
    },

    HalfStar () {
      return this.score - parseInt(this.score) >= 0.5
    },

    OffStar () {
      const halfStar = this.score - parseInt(this.score) >= 0.5 ? 1 : 0
      return this.totalStar - Math.floor(this.score) - halfStar
    }
  }
}
</script>

<style lang="scss">
@import '~v-style/BaseStar1.scss';
</style>
