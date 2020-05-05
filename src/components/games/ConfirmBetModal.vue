<template>
  <div class="modal-backdrop">
    <div class="modal">
      <form autocomplete="false" @submit="betIt">
        <header class="modal-header">
          <slot name="header">
            Let's bet for {{selectedBet.teamName}} !!!
            <div class="wait-msg">
              <br>
              <span v-if="waiting" class="setborder">Wait for confirmation</span>
            </div>
            <p v-if="betValidated" class="success-msg">Success !!!</p>
            <p v-if="betError" class="error-msg">Error bet is canceled</p>
          </slot>
        </header>
        <section class="modal-body">
          <slot name="body">
            Token available : {{ $store.getters['wallet/walletData'].csBalance }} CS
            <div v-if="!betValidated">
              <br>
              <input
                id="amountToBet"
                v-model="amountToBet"
                type="number"
                :min="1"
                :max="$store.getters['wallet/walletData'].csBalance"
              >
              <br>
              <br>
              <input
                id="privateKey"
                v-model="privateKey"
                type="text"
                placeholder="privateKey needed to sign and confirm transaction"
              >
            </div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button v-if="displayBetButton" type="button" class="btn-green" @click="betIt">Bet !</button>
            <button v-if="!betValidated" type="button" class="btn-red" @click="close">Cancel</button>
            <button v-if="betValidated" type="button" class="btn-green" @click="close">Ok</button>
          </slot>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
import { restHttp } from '../../_services/axios.service'
import nacl from 'tweetnacl'
import bs58 from 'bs58'
export default {
  name: 'confirmBetModal',
  props: ['selectedBet'],
  components: {},
  data () {
    return {
      amountToBet: 50,
      privateKey: '',
      betValidated: false,
      betError: false,
      waiting: false,
      displayBetButton: true
    }
  },
  methods: {
    close () {
      this.amountToBet = 50
      this.privateKey = ''
      this.$emit('close')
      this.displayBetButton = true
      this.betValidated = false
      this.betError = false
      this.waiting = false
    },
    setWait () {
      this.waiting = true
    },
    setErrorMsg () {
      this.displayBetButton = true
      this.betValidated = false
      this.betError = true
      this.waiting = false
    },
    setSuccessMsg () {
      this.displayBetButton = false
      this.betValidated = true
      this.betError = false
      this.waiting = false
    },
    betIt () {
      console.log(
        'do bet !!! ' + this.amountToBet + ', ' + this.$props.selectedBet.team
      )
      this.setWait()
      restHttp
        .get('matches/scheduled/getNewMatchBetToSignWithCS/' +
            this.$props.selectedBet.smartContract +
            '?publicAddress=' +
            this.$store.getters['wallet/walletData'].address +
            '&selectedTeam=' +
            this.$props.selectedBet.team +
            '&amount=' +
            this.amountToBet
        )
        .then(res => {
          var signatureHex = ''
          var trxId
          trxId = res.data.transactionId
          console.log('private ' + this.privateKey)
          var keyByte = bs58.decode(this.privateKey)
          console.log(trxId)
          console.log(res.data.hexaToSign)

          var signature = nacl.sign.detached(
            Buffer.from(res.data.hexaToSign, 'hex'),
            keyByte
          )
          var signatureBuff = new Buffer(signature)
          signatureHex = signatureBuff.toString('hex')
          restHttp
            .post('matches/scheduled/sendBetSignedWithCS/' + this.$props.selectedBet.smartContract,
              {
                publicAddress: this.$store.getters['wallet/walletData'].address,
                signature: signatureHex,
                id: trxId,
                selectedTeam: this.$props.selectedBet.team,
                amount: this.amountToBet,
                matchDateUtc: this.$props.selectedBet.matchDate,
                selectedTeamName: this.$props.selectedBet.teamName,
                matchName: this.$props.selectedBet.matchName
              }
              /*,
              {
                headers: {
                  "Content-Type": "application/json"
                }
              }
              */
            )
            .then(res2 => {
              console.log('result transaction  : ' + res2.data)
              this.amountToBet = null
              this.privateKey = null
              this.setSuccessMsg()
              if (res2.data === true) {
                this.$store.dispatch('userFutureBets/loadBets', this.$store.getters['wallet/walletData'].address)
                this.setSuccessMsg()
              } else {
                this.setErrorMsg()
              }
            })
            .catch(e => {
              console.log(e)
              this.privateKey = null
              this.amountToBet = null
              this.setErrorMsg()
            })
        })
        .catch(e => {
          console.log(e)
          this.privateKey = null
          this.amountToBet = null
          this.setErrorMsg()
        })
    }
  }
}
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
  flex-direction: row;
}

.modal-header,
.modal-footer {
  padding: 20px;
  display: flex;
}

.modal-header {
  flex-direction: column;
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

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
  margin-right: 5px;
  height: 25px;
}
.btn-red {
  color: white;
  background: rgb(172, 36, 36);
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
.success-msg {
  color: green;
}
.error-msg {
  color: red;
}
.wait-msg {
  color: orangered;
}
</style>
