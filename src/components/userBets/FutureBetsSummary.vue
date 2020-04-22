<template>
  <div>
    <strong>My current bets</strong>
    <div v-bind:key="betItem.id" v-for="betItem in this.$store.getters['userFutureBets/userFutureBetsOrderedDateDesc']">
      <futureBetItem v-bind:betItem="betItem"/>
    </div>
  </div>
</template>

<script>
import futureBetItem from '@/components/userBets/FutureBetItem.vue'
import { restHttp } from '@/_services/axios.service'

export default {
  name: 'futureBetsSummary',
  components: { futureBetItem }
}
</script>

<style scoped>

</style>
