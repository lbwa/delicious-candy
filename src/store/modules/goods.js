import { getGoods } from '../../api'

const state = {
  all: []
}

const getters = {
  allGoods (state) {
    return state.all
  }
}

const mutations = {
  setAllGoods (state, data) {
    state.all = data
  }
}

const actions = {
  getAllGoods ({ commit }) {
    getGoods().then(res => {
      commit('setAllGoods', res.data)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
