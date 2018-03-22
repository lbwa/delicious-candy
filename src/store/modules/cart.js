const state = {
  hasSelected: []
}
const getters = {
  // 格式化购物车，只保留 name , price , quantity
  goodsInCart (state) {
    return state.hasSelected.map(({good, quantity}) => {
      return {
        name: good.name,
        price: good.price,
        quantity
      }
    })
  },

  cartTotalPrice (state, getters) {
    return getters.goodsInCart.reduce((total, { price, quantity }) => {
      return total + price * quantity
    }, 0)
  },

  cartTotalQuantity (state, getters) {
    return getters.goodsInCart.reduce((total, { quantity }) => {
      return total + quantity
    }, 0)
  }
}

const mutations = {
  pushGoodsToCart (state, good) {
    // 购物车去重
    const cartItem = state.hasSelected.find(item => {
      return item.good.name === good.name
    })
    if (cartItem) {
      cartItem.quantity++
    } else {
      state.hasSelected.push({
        good,
        quantity: 1
      })
    }
  },

  cartItemQuantity (state, good) {
    console.log('got')
    const target = state.hasSelected.find(item => {
      return item.good.name === good.name
    })
    return target
  }
}

const actions = {
  addGoodsToCart ({ commit }, good) {
    commit('pushGoodsToCart', good)
  },

  subtractFromCart ({ commit }, good) {
    console.log('running')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
