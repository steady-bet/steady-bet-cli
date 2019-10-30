<template>
  <div>
    <strong>My current bets</strong>
    <div v-bind:key="betItem.id" v-for="betItem in sortedBetItems">
      <futureBetItem v-bind:betItem="betItem"/>
    </div>
  </div>
</template>

<script>
import futureBetItem from '@/components/userBets/FutureBetItem.vue'
import { restHttp } from '@/_services/axios.service'

export default {
  name: 'futureBetsSummary',
  components: { futureBetItem },

  data () {
    return {
      myFutureBets: []
    }
  },
  computed: {
    sortedBetItems: function() {
      return this.myFutureBets.sort(
        (a, b) => new Date(a.pk.matchDate) - new Date(b.pk.matchDate)
      )
    }
  },
  methods: {
    loadFutureBets() {
      if (this.$store.getters['wallet/walletData'].address) {
        console.log(this.$store.getters['wallet/walletData'].address)
        restHttp
          .get('bet/' + this.$store.getters['wallet/walletData'].address + '/getUserFutureBets')
          .then(res => {
            this.myFutureBets = res.data
            console.log(this.myFutureBets)
          })
          .catch(e => console.log(e))
      }
    }
  },
  mounted() {
    this.interval = setInterval(
      function() {
        this.loadFutureBets()
      }.bind(this),
      30000
    )
  }
};
</script>

<style scoped>

</style>

