import Vue from 'vue'
import Vuex from 'vuex'

import { multiModal } from './modules/multiModal'
import { wallet } from './modules/wallet'

Vue.use(Vuex)

// const state = {
// }

const modules = {
  multiModal,
  wallet
}

export const store = new Vuex.Store({
  // state,
  modules
})
