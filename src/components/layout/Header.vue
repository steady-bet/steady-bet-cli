<template>
  <div class="header">
    <div class="col-container">
      <div class="column1">SteadyBet</div>
      <div class="column2">
        <router-link to="/">Bet On Events</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <div class="column3">
        <WalletInfo/>
      </div>
    </div>
  </div>
</template>

<script>
import WalletInfo from "@/components/wallet/WalletInfo.vue";

export default {
  name: "Header",
  components: {
    WalletInfo
  },
  data() {
    return {
      walletInfo: {
        publicKey: ""
      }
    };
  },
  created() {}
};
</script>

<style scoped>
.col-container {
  display: table;
  width: 100%;
}
.column1 {
  display: table-cell;
  width: 10%;
}
.column2 {
  display: table-cell;
  width: 40%;
}
.column3 {
  display: table-cell;
  text-align: left;
}
</style>
