const state = {
  lastSeen: {
    scheduleCategoryId: process.env.VUE_APP_DEFAULT_TREEVIEW_NODE_ID,
    scheduleCategoryText: process.env.VUE_APP_DEFAULT_TREEVIEW_NODE_TEXT
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
  lastScheduleCategoryIdSeen: state => state.lastSeen.scheduleCategoryId,
  lastScheduleCategoryTextSeen: state => state.lastSeen.scheduleCategoryText
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
