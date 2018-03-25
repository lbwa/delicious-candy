<template>
  <div class="ratings-selector">
    <div class="ratings-type scale">
      <div
      :class="['all-ratings', selectedType === 2 ? 'active' : '']"
      @click="toggleType(2)">{{ desc.all }}<span class="count">{{ this.ratings.length }}</span></div>

      <div
      :class="['positive-ratings', selectedType === 0 ? 'active' : '']"
      @click="toggleType(0)">{{ desc.positive }}<span class="count">{{ positiveRatings }}</span>
      </div>

      <div
      :class="['negative-ratings', selectedType === 1 ? 'active' : '']"
      @click="toggleType(1)">{{ desc.negative }}<span class="count">{{ this.ratings.length - positiveRatings }}</span>
      </div>
    </div>

    <div class="ratings-switch" @click="toggleContent">
      <span :class="['icon-check_circle', fullContent ? 'on' : '']"></span>
      <span class="content">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0 // ratings 数组中 rateType 值
const ALL = 2

export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },

    selectedType: {  // 仅用于切换评价类别
      type: Number,
      default () {
        return ALL  // 默认选择显示所有评价
      }
    },

    fullContent: {  // 仅用于切换样式
      type: Boolean,
      default () {
        return false
      }
    },

    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },

  computed: {
    positiveRatings () {
      return this.ratings.filter(item => item.rateType === POSITIVE).length
    }
  },

  methods: {
    toggleContent () {
      this.$emit('fullContent')
    },

    toggleType (type) {  // 在父组件修改 selectedType，是为保证单向数据流
      this.$emit('filterRatingsType', type)
    }
  }
}
</script>

<style lang="scss">
@import '~v-style/utils.scss';

.ratings-selector {
  border-bottom: 1px solid rgba($color-bgc, .1);
  .ratings-type {
    margin: 0 18px;
    padding: 18px 0;
    font-size: 0;
    @include bottom-1px(rgba($color-bgc, .1));
    .all-ratings, .positive-ratings, .negative-ratings {
      display: inline-block;
      padding: 8px 12px;
      font-size: 12px;
      border-radius: 2px;
      line-height: 16px;
      .count {
        margin-left: 2px;
        font-size: 8px;
      }
    }
    .all-ratings, .positive-ratings, .negative-ratings {
      color: $color-normal;
      background: rgba($color-button, .2);
    }
    .all-ratings, .positive-ratings {
      margin-right: 8px;
      &.active {
        color: $color-empty;
        background: rgba($color-button, 1);
      }
    }
    .negative-ratings {
      background: rgba($color-normal, .2);
      &.active {
        color: $color-empty;
        background: rgba($color-normal, 1);
      }
    }
  }
  .ratings-switch {
    padding: 12px 18px;
    font-size: 0;
    color: rgb(147, 153, 159);
    line-height: 24px;
    .icon-check_circle {
      display: inline-block;  // 当 webfont 与文字没有对齐时，设 webfont 为行内块元素，且设置 vertical-align: top
      vertical-align: top;
      margin-right: 4px;
      font-size: 24px;
      &.on {
        color: #00c850;
      }
    }
    .content {
      vertical-align: top;
      font-size: 12px;
      line-height: 24px;
    }
  }
}
</style>
