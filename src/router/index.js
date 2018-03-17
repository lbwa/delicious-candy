import Vue from 'vue'
import Router from 'vue-router'
import goods from 'v-parts/ContentGoods'
import ratings from 'v-parts/ContentRatings'
import seller from 'v-parts/ContentSeller'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/goods'
  }, {
    path: '/goods',
    component: goods
  }, {
    path: '/ratings',
    component: ratings
  }, {
    path: '/seller',
    component: seller
  }],
  linkActiveClass: 'activated'
})
