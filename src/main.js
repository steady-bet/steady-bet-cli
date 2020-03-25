import Vue from 'vue'
import VueMomentLib from 'vue-moment-lib'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import router from './router'

import { store } from './_store'

Vue.config.productionTip = false
Vue.use(VueMomentLib)
Vue.use(VeeValidate)

Vue.filter('toCredits', function (value) {
  if (typeof value !== 'number') {
    return value
  }
  return `${value} CS`
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
