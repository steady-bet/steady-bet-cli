import { userService } from '../../_services'
import router from '../../router'

// try to get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

// create state of account
const state = user ? { status: { loggedIn: true }, user } : { status: {}, user: null }

const actions = {
  login ({ dispatch, commit }, { email, password }) {
    commit('loginRequest', { email })
    userService.login({ email, password })
      .then(
        user => {
          commit('loginSuccess', user)
          dispatch('wallet/setWallet', user.wallet, { root: true })
          commit('multiModal/hideModal', {}, { root: true })
          router.push('/')
        },
        error => {
          commit('loginFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  logout ({ commit }) {
    userService.logout()
    commit('logout')
  },
  register ({ dispatch, commit }, user) {
    commit('registerRequest', user)
    userService.register(user)
      .then(
        user => {
          commit('registerSuccess', user)
          router.push('/login')
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
  registerSuccess (state, user) {
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
