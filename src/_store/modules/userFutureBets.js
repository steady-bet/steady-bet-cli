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
  userFutureBets: state => state.userFutureBets
}

const actions = {
  loadBets ({ commit }, address) {
    console.log('*** action loadBets : adress=' + address)
    if (this.$store.getters['wallet/walletData'].address) {
      console.log(this.$store.getters['wallet/walletData'].address)
      restHttp
        .get(`bet/${this.$store.getters['wallet/walletData'].address}/getUserFutureBets`)
        .then(res => {
          this.myFutureBets = res.data
          console.log(this.myFutureBets)
        })
        .catch(e => console.log(e))
    }
  }
}

export const userFutureBets = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
