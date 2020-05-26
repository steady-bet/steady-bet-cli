<template>
  <div>
    <h3>My bets on forthcoming matches</h3>
    <div v-bind:key="betItem.id" v-for="betItem in this.userFutureBetsOrderedDateAsc">
      <futureBetItem v-bind:betItem="betItem"/>
    </div>
  </div>
</template>

<script>
import FutureBetItem from '@/components/userBets/FutureBetItem.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'futureBetsSummary',
  components: { FutureBetItem },
  computed: {
    ...mapGetters('userFutureBets', ['userFutureBetsOrderedDateAsc'])
  }
}
</script>

<style scoped>
</style>
