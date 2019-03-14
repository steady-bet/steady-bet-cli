<template>
  <div v-if="walletSetMode === true">
    <form @submit="setWallet">
      <input
        type="text"
        v-model="walletInfo.publicKey"
        name="publicKey"
        placeholder="Enter here your public Key..."
      >
      <input type="submit" class="btn" value="Ok">
    </form>
    balance : {{walletInfo.balance}}
    <br>
    last trx id : {{walletInfo.lastTrxId}}
    <br>
  </div>
  <div v-else>
    <div class="inline">
      <div class="inline">wallet : {{walletInfo.publicKey}}</div>
      <div class="inline-red" @click="enableWalletSetMode">
        &nbsp;<v-icon name="exchange-alt"/>
      </div>
    </div>
    <br>
    balance : {{walletInfo.balance}}
    <br>
    last trx id : {{walletInfo.lastTrxId}}
    <br>
  </div>
</template>

<script>
import axios from "axios";
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
export default {
  name: "WalletInfo",
  components: {
    "v-icon": Icon
  },
  data() {
    return {
      walletSetMode: true,
      walletInfo: {
        publicKey: ""
      }
    };
  },
  methods: {
    setWallet(e) {
      e.preventDefault();
      axios
        .get("http://localhost:8383/wallet/" + this.walletInfo.publicKey)
        .then(res => (this.walletInfo = res.data))
        .catch(e => console.log(e));
      this.walletSetMode = false;
    },
    enableWalletSetMode() {
      this.walletSetMode = true;
    }
  }
};
</script>

<style scoped>
.btn {
  background-color: #55aa55;
  opacity: 0.8;
}
.btn:hover {
  opacity: 1;
}
.inline-red {
  display: inline;
  color: #f55;
}
.inline {
  display: inline;
}
</style>
