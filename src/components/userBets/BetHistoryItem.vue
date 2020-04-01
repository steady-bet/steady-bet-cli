<template>
    <div>
        <div class="bet-item">
            <strong>Match</strong> {{bet.matchName}} @ {{ bet.matchDate | moment(false, "MM-DD-YYYYTHH:mm:ss") }}
            <br/>
            <div id="">
              <strong>Bet amounts :</strong>
              <div id="bet-amounts-by-match">
                <ul>
                  <li v-for="betByTeam in bet.bets" :key="betByTeam.betNumber">
                    - {{ betByTeam.betName }} = {{ betByTeam.betAmount | toCredits }}
                  </li>
                </ul>
              </div>
              <strong>TOTAL BETS = {{bet.totalBetAmount | toCredits }}</strong>
            </div>
            <br/>
            <!-- 0=open 1=live 2=closed -->
            <strong>match status :</strong> {{statusLabel}}
            <br/>
            <!-- 0=no payout 1=payout done 2=canceled -->
            <strong>payout status :</strong> {{payoutStatusLabel}}
            <br/>
            <div v-show="hasPayout">
              <strong>payout :</strong> {{bet.payout | toCredits }}
              <br/>
            </div>
            smartcontract : <a v-bind:href="linkToSmart">{{bet.smartContract}}</a>
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
      return (`https://monitor.credits.com/testnet/Contract/${this.bet.smartContract}`)
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
    },
    hasPayout () {
      return (this.bet.payout && this.bet.payout !== -1)
    }
  },
  methods: {
  }
}
</script>

<style scoped>
#bet-amounts div {
  text-align:center;
}
#bet-amounts-by-match ul, #bet-amounts-by-match li {
    margin: 0;
    padding: 0;
    text-align: left;
    text-indent: 50%;
}
</style>
