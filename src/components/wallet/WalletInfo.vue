<template>
  <div v-if="walletSetMode === true">
    <form @submit="setWallet">
      <input
        type="text"
        v-model="walletInfo.publicKey"
        name="publicKey"
        placeholder="Enter here your public Key..."
      >
      <input type="submit" class="btn" value="Ok" >
    </form>
    balance : {{walletInfo.balance}}
    <br>
    last trx id : {{walletInfo.lastTrxId}}
    <br>
  </div>
  <div v-else>
    wallet : {{walletInfo.publicKey}}<div @click="enableWalletSetMode" class="temporay">Click On Me To Change wallet</div>
    balance : {{walletInfo.balance}}
    <br>
    last trx id : {{walletInfo.lastTrxId}}
    <br>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WalletInfo",
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
    enableWalletSetMode(){
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
.temporay{
    color: #f55
}
</style>
