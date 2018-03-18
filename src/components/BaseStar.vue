<template>
  <div :class="['star-rate', starType]">
    <span
    :class="['star-item', item]"
    v-for="(item, index) of starStyle"
    :key="index"
    />
  </div>
</template>

<script>

const TOTAL_STAR = 5
const FULL_STAR  = 'on'
const HALF_STAR  = 'half'
const EMPTY_STAR = 'off'

export default {
  props: {
    // ajax 是异步请求,在父组件中设置 sellerData.score || 0(初始 score 值为 0)
    score: {
      type: Number,
      required: true
    },

    size: {
      type: Number
    }
  },

  computed: {
    starType () {
      return `star-${this.size}`
    },

    starStyle () {
      let result     = []
      let integer    = Math.floor(this.score)
      let score      = Math.floor(this.score * 2) / 2  // 扩大半数
      let hasDecimal = score % 1 !== 0

      for (let i = 0; i < integer; i++) {
        result.push(FULL_STAR)
      }
      if (hasDecimal) {
        result.push(HALF_STAR)
      }
      while (result.length < TOTAL_STAR) {
        result.push(EMPTY_STAR)
      }

      return result
    }
  }
}
</script>

<style lang="scss">
@import '~v-style/BaseStar.scss';
</style>
