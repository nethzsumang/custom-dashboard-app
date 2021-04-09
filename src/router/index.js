import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import store from '../store'
import _ from 'lodash'
import Swal from 'sweetalert2'

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

router.beforeEach((to, from, next) => {
  const aRoutePaths = _.map(routes, 'path')
  if (aRoutePaths.includes(to.path) === false) {
    Swal.fire({
      text: 'There is no dashboard with that path.',
      icon: 'error'
    }).then(() => {
      next({ path: aRoutePaths[0] })
    })
  }
  next()
})

export default router
