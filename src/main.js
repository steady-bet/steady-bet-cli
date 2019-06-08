import Vue from 'vue'
import VueMomentLib from 'vue-moment-lib'
import App from './App.vue'
import router from './router'

import { store } from './_store'

Vue.config.productionTip = false
Vue.use(VueMomentLib)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
