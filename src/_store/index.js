import Vue from 'vue'
import Vuex from 'vuex'

import { multiModal } from './modules/multiModal'
import { wallet } from './modules/wallet'
import { account } from './modules/account.module'
import { alert } from './modules/alert.module'
import { userFutureBets } from './modules/userFutureBets'

Vue.use(Vuex)

// const state = {
// }

const modules = {
  multiModal,
  wallet,
  account,
  alert,
  userFutureBets
}

export const store = new Vuex.Store({
  // state,
  modules
})
