<template>
  <div class="modal-backdrop">
    <div class="modal">
      <form autocomplete="false" @submit="betIt">
        <header class="modal-header">
          <slot name="header">Let's bet for {{selectedBet.teamName}} !!!</slot>
        </header>
        <section class="modal-body">
          <slot name="body">
            Token available : {{ $store.getters.walletData.tokenBalance }} TBT
            <br>
            <br>
            <input id="amountToBet" v-model="amountToBet" type="text" placeholder="0 TBT">
            <br>
            <input
              id="privateKey"
              v-model="privateKey"
              type="text"
              placeholder="privateKey needed to sign and confirm transaction"
            >
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn-green" @click="betIt">Bet !</button>
            <button type="button" class="btn-red" @click="close">Cancel</button>
          </slot>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import nacl from "tweetnacl";
import bs58 from "bs58";
export default {
  name: "confirmBetModal",
  props: ["selectedBet"],
  data() {
    return {
      amountToBet: 0,
      privateKey: ""
    };
  },
  methods: {
    close() {
      this.amountToBet = null;
      this.$emit("close");
    },
    betIt() {
      console.log(
        "do bet !!! " + this.amountToBet + ", " + this.$props.selectedBet.team
      );

      axios
        .get(
          "http://localhost:8383/matches/getNewMatchBetToSign/" +
            this.$props.selectedBet.smartContract +
            "?publicAddress=" +
            this.$store.getters.walletData.address +
            "&selectedTeam=" +
            this.$props.selectedBet.team +
            "&amount=" +
            this.amountToBet
        )
        .then(res => {
          var signatureHex = "";
          var trxId;
          trxId = res.data.transactionId;
          console.log("private " + this.privateKey);
          var keyByte = bs58.decode(this.privateKey);
          console.log(trxId);
          console.log(res.data.hexaToSign);

          var signature = nacl.sign.detached(
            Buffer.from(res.data.hexaToSign, "hex"),
            keyByte
          );
          var signatureBuff = new Buffer(signature);
          signatureHex = signatureBuff.toString("hex");
          axios
            .post(
              "http://localhost:8383/matches/sendBetSigned/" +
                this.$props.selectedBet.smartContract,
              {
                publicAddress: this.$store.getters.walletData.address,
                signature: signatureHex,
                id: trxId,
                selectedTeam: this.$props.selectedBet.team,
                amount: this.amountToBet
              },
              {
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
            .then(res2 => {
              console.log("result transaction  : " + res2.data);
              this.amountToBet = null;
              this.privateKey = null;
              this.$emit("close");
            })
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    }
  }
};
</script>


<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 20px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
.btn-red {
  color: white;
  background: rgb(172, 36, 36);
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>
