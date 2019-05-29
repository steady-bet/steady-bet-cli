import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        walletData: {
            address: '',
            csBalance: 0,
            tokenBalance: 0
        },
    },
    mutations: {
        changeWallet(state, address) {
            state.walletData.address = address;  
        },
        updateBalance(state, csBalance) {
            state.walletData.csBalance = csBalance;
        },
        updateWalletToken(state, tokenBalance) {
            state.walletData.tokenBalance = tokenBalance;
        }
    },
    getters: {
        walletData: state => state.walletData
      }
})
