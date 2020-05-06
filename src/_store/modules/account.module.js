import { userService } from '../../_services'
import router from '../../router'

// try to get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

// create state of account
const state = user ? { status: { loggedIn: true }, user } : { status: {}, user: null }

const actions = {
  login ({ dispatch, commit }, { username, password }) {
    commit('loginRequest', { username })
    userService.login({ username, password })
      .then(
        jwtResponse => {
          if (jwtResponse && jwtResponse.user) {
            commit('loginSuccess', jwtResponse.user)
            dispatch('wallet/setWallet', jwtResponse.user.wallet, { root: true })
            dispatch('userFutureBets/loadBets', jwtResponse.user.wallet, { root: true })
            commit('multiModal/hideModal', {}, { root: true })
            router.push('/')
          }
        },
        error => {
          commit('loginFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  logout ({ commit }) {
    commit('logout')
    userService.logout()
    commit('wallet/changeWallet', '', { root: true })
    commit('wallet/updateBalance', 0.0, { root: true })
    commit('userFutureBets/updateBets', [], { root: true })
    console.log('logout ok')
    router.push('/')
  },
  register ({ dispatch, commit }, user) {
    commit('registerRequest', user)
    userService.register(user)
      .then(
        user => {
          // commit('registerSuccess', user)
          commit('registerSuccess')
          // show Login popup after successful registering
          commit('multiModal/setModal', 'Login', { root: true })
          setTimeout(() => {
            // display success message after route change completes
            dispatch('alert/success', 'Registration successful', { root: true })
          })
        },
        error => {
          commit('registerFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  }
}

const mutations = {
  loginRequest (state, user) {
    state.status = { loggedIn: true }
    state.user = user
  },
  loginSuccess (state, user) {
    state.status = { loggedIn: true }
    state.user = user
  },
  loginFailure (state) {
    state.status = {}
    state.user = null
  },
  logout (state) {
    state.status = {}
    state.user = null
  },
  registerRequest (state, user) {
    state.status = { registering: true }
  },
  registerSuccess (state) {
    state.status = {}
  },
  registerFailure (state, error) {
    state.status = {}
  }
}

// expose account store
export const account = {
  namespaced: true,
  state,
  actions,
  mutations
}
