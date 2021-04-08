import Vue from 'vue'
import Vuex from 'vuex'
import { loadInitialData } from '../libraries/dashboard-data'
import { DEFAULT_CARD_DATA } from '../constants/app-constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: loadInitialData(),
    createCardData: { ...DEFAULT_CARD_DATA },
    editCardToggle: false,
    cardIdToEdit: null,
    editDialogToggle: false
  },
  mutations: {
    setDashboardData (state, oData) {
      Vue.set(state, 'data', oData)
    },
    setCreateCardData (state, oData) {
      Vue.set(state, 'createCardData', oData)
    },
    setEditCardToggle (state, bToggle) {
      this.state.editCardToggle = bToggle
    },
    setCardIdToEdit (state, mId) {
      this.state.cardIdToEdit = mId
    },
    setEditDialogToggle (state, bToggle) {
      this.state.editDialogToggle = bToggle
    }
  },
  actions: {
    setDashboardData ({ commit }, oData) {
      commit('setDashboardData', oData)
    },
    setCreateCardData ({ commit }, oData) {
      commit('setCreateCardData', oData)
    },
    setEditCardToggle ({ commit }, bToggle) {
      commit('setEditCardToggle', bToggle)
    },
    setCardIdToEdit ({ commit }, mId) {
      commit('setCardIdToEdit', mId)
    },
    setEditDialogToggle ({ commit }, bToggle) {
      commit('setEditDialogToggle', bToggle)
    }
  },
  modules: {
  }
})
