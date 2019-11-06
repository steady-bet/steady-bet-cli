import { restHttp } from '../../_services/axios.service'

const state = {
  walletData: {
    address: '',
    csBalance: 0
    /*
    , tokenBalance: 0
    */
  }
}

const mutations = {
  changeWallet (state, address) {
    state.walletData.address = address
  },
  updateBalance (state, csBalance) {
    state.walletData.csBalance = csBalance
  }
  /*
  ,
  updateWalletToken (state, tokenBalance) {
    state.walletData.tokenBalance = tokenBalance
  }
  */
}

const getters = {
  walletData: state => state.walletData
}

const actions = {
  setWallet ({ commit }, address) {
    console.log('*** action setWallet : adress=' + address)
    // if user is authenticated, his token is in local storage
    // token is added automagically in axios.service.js
    restHttp
      .get('wallet/' + address)
      .then(res => {
        let walletInfo = res.data
        console.log('balance=' + walletInfo.balance)
        commit('changeWallet', walletInfo.publicKey)
        commit('updateBalance', walletInfo.balance)
      }).catch(e => console.log(e))
    
    /*restHttp
      .get('wallet/getToken/' + address)
      .then(res => {
        let tokenTBTAmount = res.data
        console.log('token balance=' + tokenTBTAmount)
        commit('updateWalletToken', tokenTBTAmount)
      })
      .catch(e => console.log(e))*/
    
  }
}

export const wallet = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
