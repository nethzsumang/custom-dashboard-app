import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import store from '../store'
import _ from 'lodash'

Vue.use(VueRouter)

const routes = _.map(store.state.data, (oValue) => {
  return {
    path: oValue.path,
    name: oValue.name,
    component: Dashboard
  }
})

store.dispatch('setRoutes', routes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
