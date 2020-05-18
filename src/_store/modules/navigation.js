const state = {
  lastSeen: {
    scheduleCategoryId: '',
    scheduleCategoryText: ''
  }
}

const mutations = {
  changeLastScheduleCategoryId (state, id) {
    state.lastSeen.scheduleCategoryId = id
  },
  changeLastScheduleCategoryText (state, text) {
    state.lastSeen.scheduleCategoryText = text
  }

}

const getters = {
  lastscheduleCategoryIdSeen: state => state.lastSeen.scheduleCategoryId,
  lastscheduleCategoryTextSeen: state => state.lastSeen.scheduleCategoryText
}

const actions = {
  setLastCategorySeenId ({ commit }, id) {
    commit('changeLastScheduleCategoryId', id)
  },
  setLastCategorySeenText ({ commit }, atext) {
    commit('changeLastScheduleCategoryText', atext)
  }  
}

export const navigation = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
