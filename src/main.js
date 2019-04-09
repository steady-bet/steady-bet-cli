import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false
Vue.use(VueMomentLib);
import VueMomentLib from "vue-moment-lib";

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
