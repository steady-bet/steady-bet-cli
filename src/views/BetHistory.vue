<template>
  <div>
    <h1>Bet history</h1>
    <div v-bind:key="betItem.id" v-for="betItem in sortedBetItems">
      <BetHistoryItem v-bind:bet="betItem" />
    </div>
    <h2>TOTALS</h2>
    <div class="bet-item">
          <dl>
            <dt>TOTAL BETS</dt>
            <dd><strong>{{totalAmounts.totalBetAmount | toCredits }}</strong></dd>
            <dt>TOTAL PAYOUT</dt>
            <dd><strong>{{totalAmounts.totalPayout | toCredits }}</strong></dd>
            <dt >GLOBAL BET BALANCE</dt>
            <dd>
              <strong>{{totalAmounts.balance | toCredits }}</strong>&nbsp;
              <img v-if="totalAmounts.balance>0" src="@/assets/trophy-cup_32x32.png" height="16" width="16"/>
              <img v-else-if="totalAmounts.balance<0" src="@/assets/thumbs_down.png" height="16" width="16"/>
            </dd>
          </dl>
    </div>
  </div>
</template>

<script>
import { restHttp } from '@/_services/axios.service'
import BetHistoryItem from '@/components/userBets/BetHistoryItem'

// const betAmountReducer = (total, bet) => total + bet.totalBetAmount

export default {
  name: 'betHistory',
  // props: [ 'tabContent' ], // contains list of BetByUser beans
  components: { BetHistoryItem },
  data () {
    return {
      bets: []
    }
  },
  computed: {
    sortedBetItems: function () {
      // reverse order by match date
      // eslint-disable-next-line
      return this.bets.sort(
        (a, b) => new Date(b.matchDate) - new Date(a.matchDate)
      )
    },
    totalAmounts: function () {
      var totals = {
        totalBetAmount: 0.0,
        totalPayout: 0.0,
        balance: 0.0
      }
      this.bets.forEach(bet => {
        totals.totalBetAmount += bet.totalBetAmount
        totals.totalPayout += (bet.payout !== -1 ? bet.payout : 0.0)
      })
      totals.balance = totals.totalPayout - totals.totalBetAmount
      return totals
    }
  },
  methods: {
    loadBets () {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user && user.username) {
        restHttp
          .get(`bet/${user.username}/getAllUserBets`)
          .then(res => {
            this.bets = res.data
          })
          .catch(e => console.log(e))
      }
    }
  },
  mounted () {
    console.log('mounted : loadBets')
    this.loadBets()
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
