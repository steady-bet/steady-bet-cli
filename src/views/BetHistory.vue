<template>
  <div>
    <h1>Bet history</h1>
    <div v-bind:key="betItem.id" v-for="betItem in sortedBetItems">
      <BetHistoryItem v-bind:bet="betItem" />
    </div>
  </div>
</template>

<script>
import { restHttp } from '@/_services/axios.service'
import BetHistoryItem from '@/components/userBets/BetHistoryItem'

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
    }
  },
  methods: {
    loadBets () {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user && user.wallet) {
        restHttp
          .get(`bet/${user.wallet}/getAllUserBets`)
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
</style>
