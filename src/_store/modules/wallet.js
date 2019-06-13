const state = {
  walletData: {
    address: '',
    csBalance: 0,
    tokenBalance: 0
  }
}

const mutations = {
  changeWallet (state, address) {
    state.walletData.address = address
  },
  updateBalance (state, csBalance) {
    state.walletData.csBalance = csBalance
  },
  updateWalletToken (state, tokenBalance) {
    state.walletData.tokenBalance = tokenBalance
  }
}

const getters = {
  walletData: state => state.walletData
}

export const wallet = {
  namespaced: true,
  state,
  mutations,
  getters
}
