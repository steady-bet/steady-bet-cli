const state = {
  modalName: ''
}

const mutations = {
  setModal (state, name) {
    state.modalName = name
  },
  hideModal (state) {
    state.modalName = ''
  }
}

const actions = {
  showModalLogin ({ commit }) {
    commit('setModal', 'Login')
  },
  showModalRegister ({ commit }) {
    commit('setModal', 'Register')
  }
}

export const multiModal = {
  namespaced: true,
  state,
  mutations,
  actions
}
