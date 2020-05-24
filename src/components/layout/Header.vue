<template>
  <div id="header">
    <h1>SteadyBet</h1>
    <nav id="navbar" class="hnav">
      <ul>
        <li>
          <router-link to="/">Bet On Events</router-link>|
        </li>
        <li>
          <router-link to="/live">Live</router-link>|
        </li>
        <li>
          <router-link to="/betHistory">Bet history</router-link>|
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
      </ul>
    </nav>
    <nav id="authentication" class="hnav">
      <li>
        <button id="show-modal-login" class="navbar-show-modal" v-if="!status.loggedIn" @click="showModalLogin">Login</button>
      </li>
      <li>
        <button id="show-modal-register" class="navbar-show-modal" v-if="!status.loggedIn" @click="showModalRegister">Register</button>
      </li>
      <li>
        <button id="disconnect" class="navbar-show-modal" v-if="status.loggedIn" @click="disconnect">Disconnect</button>
      </li>
      <li>
        <wallet-info v-if="status.loggedIn"/>
      </li>
    </nav>
    <multi-modal-auth-view/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import WalletInfo from '@/components/wallet/WalletInfo.vue'
import MultiModalAuthView from '@/views/MultiModalAuthView.vue'

export default {
  name: 'Header',
  components: {
    WalletInfo,
    MultiModalAuthView
  },
  methods: {
    ...mapActions('multiModal', ['showModalLogin', 'showModalRegister']),
    ...mapActions('account', ['logout']),
    ...mapActions('wallet', ['setWallet']),
    disconnect () {
      this.logout()
    }
  },
  computed: {
    ...mapState('account', ['status'])
  },
  data () {
    return {
      walletInfo: {
        publicKey: ''
      }
    }
  },
  created () {
    // if the user is already in localStorage update wallet info in header
    var user = JSON.parse(localStorage.getItem('user'))
    if (user && user.wallet && localStorage.getItem('access_token')) {
      this.setWallet(user.wallet)
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/style";

#header {
  height: 100px;
  background: #000 url("../../assets/banner.jpg") top left no-repeat;
}
#header h1 {
  float: left;
  margin: 25px 0px 0px 180px;
}
.hnav {
  margin: 0;
  padding: 1em 0.5em 0.1em 0;
  list-style-type: none;
}
.hnav li {
  display: inline;
}
.hnav li a {
  text-decoration: none;
  font-weight: bold;
  font-size: 120%;
  color: #000;
}
.hnav li a:hover {
  background: yellow;
}
nav#navbar {
  float: left;
}
nav#authentication {
  float: right;
}
</style>
