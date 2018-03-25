<template>
  <div class="content-ratings">
    <div class="ratings-content-wrapper">
      <div class="seller-overview">
        <div class="score">
          <span class="score-content">{{ sellerData.score }}</span>
          <span class="title">综合评分</span>
          <div class="rank">高于周边商家{{ sellerData.rankRate }}</div>
        </div>
      </div>
      <BaseSplit/>

      <BaseRatingsSelector
      :ratings="allRatings"
      :selectedType="selectedType"
      :fullContent="fullContent"
      @filterRatingsType="toggleRatingsType"
      @fullContent="toggleFullContent"
      />

      <div class="ratings-detail">
        <ul>
          <li
          class="single-rating"
          v-for="(item, index) of filterRatings"
          :key="index"
          v-show="filterFullContent(item.rateType, item.text)"
          >
          <!-- todo -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getRatings } from '@/api'

import BaseSplit from './BaseSplit'
import BaseRatingsSelector from './BaseRatingsSelector'

const checkStatus = 0
const ALL = 2 // rateType 值
const POSITIVE = 0
const NEGATIVE = 1

export default {
  props: {
    sellerData: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      allRatings: [],
      selectedType: ALL,
      fullContent: false,
      ratingsDescription: {}  // 取组件默认值
    }
  },

  computed: {
    filterRatings () {
      if (this.selectedType === ALL) {
        return this.allRatings
      } else if (this.selectedType === POSITIVE) {
        return this.allRatings.filter(item => item.rateType === POSITIVE)
      } else {
        return this.allRatings.filter(item => item.rateType === NEGATIVE)
      }
    }
  },

  methods: {
    toggleRatingsType (type) {
      this.selectedType = type
      this.$nextTick(() => {})
    },

    toggleFullContent () {
      this.fullContent = !this.fullContent
      this.$nextTick(() => {})
    },

    filterFullContent (type, text) {
      if (this.fullContent && !text) {
        return false
      }
      return true
    }
  },

  components: {
    BaseSplit,
    BaseRatingsSelector
  },

  created () {
    getRatings().then(res => {
      if (res.errno === checkStatus) {
        this.allRatings = res.data
        this.$nextTick(() => {})
      } else {
        throw Error(`check errno failed. erron is ${res.errno} !`)
      }
    })
  }
}
</script>

<style lang="scss">

</style>
