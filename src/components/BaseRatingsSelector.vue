<template>
  <div class="ratings-selector">
    <div class="ratings-type scale">
      <div class="all-ratings">全部<span class="count">{{ allRatings }}</span>
      </div>
      <div class="positive-ratings">推荐<span class="count">{{ positiveRatings }}</span>
      </div>
      <div class="negative-ratings">吐槽<span class="count">{{ allRatings - positiveRatings }}</span>
      </div>
    </div>

    <div class="ratings-switch" @click="toggleActive">
      <span :class="['icon-check_circle', isActive ? 'on' : '']"></span>
      <span class="content">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    singleGood: {
      type: Object
    }
  },

  data () {
    return {
      isActive: false
    }
  },

  computed: {
    // 在初始化组件时用户还未点击商品前，传入的对象为空
    allRatings () {
      if (Object.keys(this.singleGood).length === 0) {  // 检测对象是否为空
        return
      }
      return this.singleGood.ratings.length
    },
    positiveRatings () {
      if (Object.keys(this.singleGood).length === 0) {  // 传入对象为空时，不筛选
        return
      }
      const result = this.singleGood.ratings.filter(item => item.rateType === 0).length
      return result
    }
  },

  methods: {
    toggleActive () {
      this.isActive = !this.isActive
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
    .positive-ratings, .negative-ratings {
      color: rgb(77, 85, 93);
    }
    .all-ratings {
      margin-right: 8px;
      color: $color-empty;
      background: rgba(0, 160, 220, 1);
    }
    .positive-ratings {
      margin-right: 8px;
      background: rgba(0, 160, 220, .2);
    }
    .negative-ratings {
      background: rgba(77, 85, 93, .2);
    }
  }
  .ratings-switch {
    padding: 12px 18px;
    font-size: 0;
    color: rgb(147, 153, 159);
    line-height: 24px;
    .icon-check_circle {
      display: inline-block;
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
