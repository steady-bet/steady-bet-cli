const state = {
  lastSeen: {
    scheduleCategory: ''
  }
}

const mutations = {
  changeLastScheduleCategory (state, id) {
    state.lastSeen.scheduleCategory = id
  }

}

const getters = {
  lastscheduleCategorySeen: state => state.lastSeen.scheduleCategory
}

const actions = {
  setLastCategorySeen ({ commit }, id) {
    commit('changeLastScheduleCategory', id)
  }
}

export const navigation = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
