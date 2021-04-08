import Vue from 'vue'
import Vuex from 'vuex'
import { loadInitialData } from '../libraries/dashboard-data'
import { DEFAULT_CARD_DATA } from '../constants/app-constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: loadInitialData(),
    createCardData: { ...DEFAULT_CARD_DATA }
  },
  mutations: {
    setDashboardData (state, oData) {
      Vue.set(state, 'data', oData)
    },
    setCreateCardData (state, oData) {
      Vue.set(state, 'createCardData', oData)
    }
  },
  actions: {
    setDashboardData ({ commit }, oData) {
      commit('setDashboardData', oData)
    },
    setCreateCardData ({ commit }, oData) {
      commit('setCreateCardData', oData)
    }
  },
  modules: {
  }
})
