<template>
    <div>
        <div class="bet-item">
            <dl>
              <dt>Match</dt>
              <dd><strong>{{bet.matchName}}</strong>  [ {{ bet.matchDate | moment(false, "MM-DD-YYYYTHH:mm:ss") }} ]</dd>

              <dt>Bet amounts</dt>
              <dd>
                <div id="bet-amounts-by-match">
                  <ul>
                    <li v-for="betByTeam in bet.bets" :key="betByTeam.betNumber">
                      {{ betByTeam.betName }} = {{ betByTeam.betAmount | toCredits }}
                    </li>
                  </ul>
                </div>
              </dd>

              <dt>TOTAL BETS</dt>
              <dd><strong>{{bet.totalBetAmount | toCredits }}</strong></dd>

              <dt>Match status</dt> <!-- 0=open 1=live 2=closed -->
              <dd>{{statusLabel}}</dd>

              <dt>Payout status</dt> <!-- 0=no payout 1=payout done 2=canceled -->
              <dd>{{payoutStatusLabel}}</dd>

              <dt v-show="hasPayout">PAYOUT</dt>
              <dd v-show="hasPayout"><strong>{{bet.payout | toCredits }}</strong></dd>

              <dt v-show="(this.bet.status === 2)">TOTAL BETS - PAYOUT = BET BALANCE</dt>
              <dd v-show="(this.bet.status === 2)">
                  <strong>{{ betBalance | toCredits }}</strong>&nbsp;
                  <img v-if="betBalance>0" src="@/assets/trophy-cup_32x32.png" height="16" width="16"/>
                  <img v-else-if="betBalance<0" src="@/assets/thumbs_down.png" height="16" width="16"/>
              </dd>

              <dt>Smartcontract</dt>
              <dd><a v-bind:href="linkToSmart">{{bet.smartContract}}</a></dd>

            </dl>
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
    },
    betBalance () {
      if (this.bet.payoutStatus === 0) {
        // NO PAYOUT
        return 0.0 - this.bet.totalBetAmount
      } else if (this.bet.payoutStatus === 1) {
        // PAYOUT
        if (this.bet.payout !== -1) {
          return this.bet.payout - this.bet.totalBetAmount
        } else {
          return 0.0 - this.bet.totalBetAmount
        }
      } else {
        // CANCELED or UNKNOWN
        return 0.0
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.bet-item dl {
  display: flex;
  flex-flow: row wrap;
  border: solid #333;
  border-width: 1px 1px 0 0;
}
.bet-item dt {
  flex-basis: 40%;
  padding: 2px 4px;
  /*background: #333;*/
  background: #555d77;
  text-align: right;
  color: #fff;
}
.bet-item dd {
  flex-basis: 35%;
  flex-grow: 1;
  margin: 0px;
  padding: 2px 4px;
  text-align: left;
  border-bottom: 1px solid #333;
}
</style>
