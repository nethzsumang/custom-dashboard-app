import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'

require('./plugins/vue2editor')
require('./plugins/vueswal2')

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
