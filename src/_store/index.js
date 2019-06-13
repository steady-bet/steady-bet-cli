import Vue from 'vue'
import Vuex from 'vuex'

import { wallet } from './modules/wallet'

Vue.use(Vuex)

// const state = {
// }

const modules = {
  wallet
}

export const store = new Vuex.Store({
  // state,
  modules
})
