import { restHttp } from '../../_services/axios.service'

const state = {
  userFutureBets: []
}

const mutations = {
  updateBets (state, bets) {
    state.userFutureBets = bets
  }
}

const getters = {
  userFutureBets: state => state.userFutureBets,
  userFutureBetsOrderedDateAsc: state => {
    return state.userFutureBets.sort(userFutureBet => userFutureBet.pk.matchDate)
  },
  userFutureBetsOrderedDateDesc: state => {
    return state.userFutureBets.reverse(userFutureBet => userFutureBet.pk.matchDate)
  }
}

const actions = {
  loadBets ({ commit }, address) {
    console.debug(`*** action loadBets : adress=${address}`)
    restHttp
      .get(`bet/${address}/getUserFutureBets`)
      .then(res => {
        this.myFutureBets = res.data
        commit('updateBets', res.data)
        console.debug(this.myFutureBets)
      })
      .catch(e => console.log(e))
  }
}

export const userFutureBets = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
