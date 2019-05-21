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
    TBT Token : {{tokenTBTAmount}}
    <br>
    last trx id : {{walletInfo.lastTrxId}}
    <br>

  </div>
  <div v-else>
    <div class="inline">
      <div class="inline">wallet : {{walletInfo.publicKey}}</div>
      <div class="inline-red" @click="enableWalletSetMode">
        &nbsp;
        <v-icon name="exchange-alt"/>
      </div>
    </div>
    <br>
    balance : {{walletInfo.balance}}
    <br>
    TBT Token : {{tokenTBTAmount}}    
    <br>
    last trx id : {{walletInfo.lastTrxId}}
    <br>
  </div>
</template>

<script>
import axios from "axios";
import "vue-awesome/icons/exchange-alt";
import Icon from "vue-awesome/components/Icon";
import nacl from "tweetnacl";
import bs58 from "bs58";

export default {
  name: "WalletInfo",
  components: {
    "v-icon": Icon
  },
  data() {
    return {
      walletSetMode: true,
      walletInfo: {
        publicKey: "",
      },
      tokenTBTAmount: ""
    };
  },
  methods: {
    setWallet(e) {
      e.preventDefault();
      var keyByte = bs58.decode(
        "YpWzyv9PPBZhHSXMcChoaxpGtbXX4vPHCNqpDFbz2vg5gPSH1Xz35ZYftgp8EvJocRp7wU4KqjDDMBLFkZv7rSB"
      );

      axios
        .get("http://localhost:8383/wallet/" + this.walletInfo.publicKey)
        .then(res => (this.walletInfo = res.data))
        .catch(e => console.log(e));

      axios
        .get(
          "http://localhost:8383/wallet/getToken/" + this.walletInfo.publicKey
        )
        .then(res => {
          var signatureHex = "";
          var trxId;
          console.log(res.data);
          console.log(res.data.hexaToSign);
          trxId = res.data.transactionId;

          var signature = nacl.sign.detached(
            Buffer.from(res.data.hexaToSign, "hex"),
            keyByte
          );
          var signatureBuff = new Buffer(signature);
          signatureHex = signatureBuff.toString("hex");
          console.log("signature : " + signatureHex);
          axios
            .post(
              "http://localhost:8383/wallet/getToken/" +
                this.walletInfo.publicKey,
              { signature: signatureHex, id: trxId },
              {
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
            .then(res2 => {
              console.log("token amount : "+res2.data);
              this.tokenTBTAmount = res2.data;
            })
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));


      this.walletSetMode = false;
    },
    enableWalletSetMode() {
      this.walletSetMode = true;
      this.walletInfo.balance="";
      this.walletInfo.lastTrxId=null;
      this.tokenTBTAmount= "";
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
