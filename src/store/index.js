import Vue from 'vue'
import Vuex from 'vuex'
import { loadInitialData } from '../libraries/dashboard-data'
import { DEFAULT_CARD_DATA, DEFAULT_DASHBOARD_DATA } from '../constants/app-constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routes: [],
    expandedDrawer: false,
    data: loadInitialData(),
    createCardData: { ...DEFAULT_CARD_DATA },
    createDashboardData: { ...DEFAULT_DASHBOARD_DATA },
    editCardToggle: false,
    cardIdToEdit: null,
    editDialogToggle: false,
    editDashboardDialogToggle: false
  },
  mutations: {
    setRoutes (state, aRoutes) {
      Vue.set(state, 'routes', aRoutes)
    },
    setExpandedDrawer (state, bIsExpanded) {
      this.state.expandedDrawer = bIsExpanded
    },
    setDashboardData (state, oData) {
      Vue.set(state, 'data', oData)
    },
    setCreateCardData (state, oData) {
      Vue.set(state, 'createCardData', oData)
    },
    setCreateDashboardData (state, oData) {
      Vue.set(state, 'createDashboardData', oData)
    },
    setEditCardToggle (state, bToggle) {
      this.state.editCardToggle = bToggle
    },
    setCardIdToEdit (state, mId) {
      this.state.cardIdToEdit = mId
    },
    setEditDialogToggle (state, bToggle) {
      this.state.editDialogToggle = bToggle
    },
    setEditDashboardDialogToggle (state, bToggle) {
      this.state.editDashboardDialogToggle = bToggle
    }
  },
  actions: {
    setRoutes ({ commit }, aRoutes) {
      commit('setRoutes', aRoutes)
    },
    setExpandedDrawer ({ commit }, bIsExpanded) {
      commit('setExpandedDrawer', bIsExpanded)
    },
    setDashboardData ({ commit }, oData) {
      commit('setDashboardData', oData)
    },
    setCreateCardData ({ commit }, oData) {
      commit('setCreateCardData', oData)
    },
    setCreateDashboardData ({ commit }, oData) {
      commit('setCreateDashboardData', oData)
    },
    setEditCardToggle ({ commit }, bToggle) {
      commit('setEditCardToggle', bToggle)
    },
    setCardIdToEdit ({ commit }, mId) {
      commit('setCardIdToEdit', mId)
    },
    setEditDialogToggle ({ commit }, bToggle) {
      commit('setEditDialogToggle', bToggle)
    },
    setEditDashboardDialogToggle ({ commit }, bToggle) {
      commit('setEditDashboardDialogToggle', bToggle)
    }
  },
  modules: {
  }
})
