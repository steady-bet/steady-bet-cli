<template>
    <div>
        <div class="bet-item">
            <strong>Match</strong> {{bet.matchName}} @ {{ bet.pk.matchDate | moment(false, "MM-DD-YYYYTHH:mm:ss") }}
            <br/>
            <strong>Bet on</strong> {{bet.betName}} @ {{ bet.pk.betDate | moment(false, "MM-DD-YYYYTHH:mm:ss") }}
            <br/>
            <strong>bet amount :</strong> {{bet.betAmount}} CS
            <br/>
            <!-- 0=open 1=live 2=closed -->
            <strong>match status :</strong> {{statusLabel}}
            <br/>
            <!-- 0=open 1=live 2=closed -->
            <strong>payout status :</strong> {{payoutStatusLabel}}
            <br/>
            <strong>payout :</strong> {{bet.payout ? bet.payout : 0}} CS
            <br>
            smartcontract : <a v-bind:href="linkToSmart">{{bet.pk.smartContract}}</a>
            <hr/>
        </div>
    </div>
</template>

<script>
// import { restHttp } from '@/_services/axios.service'

/*
date du pari
date du match / heure / équipes
score du match si match fini
montant du pari
gain éventuels
solde de l'opération gain - montant du pari
*/
export default {
  name: 'betHistoryItem',
  props: ['bet'],
  data () {
    return {
    }
  },
  computed: {
    linkToSmart () {
      return (`https://monitor.credits.com/testnet/Contract/${this.bet.pk.smartContract}`)
    },
    payoutStatusLabel () {
      if (this.bet.payoutStatus === 0) {
        return 'NO PAYOUT'
      } else if (this.bet.payoutStatus === 1) {
        return 'PAYOUT DONE'
      } else if (this.bet.payoutStatus === 2) {
        return 'CANCELED'
      } else {
        return 'UNKNOWN'
      }
    },
    statusLabel () {
      if (this.bet.status === 0) {
        return 'STILL OPEN'
      } else if (this.bet.status === 1) {
        return 'MATCH IS LIVE!'
      } else if (this.bet.status === 2) {
        return 'CLOSED'
      } else {
        return 'UNKNOWN'
      }
    }
  }
}
</script>

<style scoped>
</style>
