<template>
  <div>
    <div v-bind:key="game.id" v-for="game in sortedGames">
      <GameItem v-bind:game="game"/>
    </div>
  </div>
</template>

<script>
import GameItem from '@/components/games/GameItem.vue'

export default {
  name: 'games',
  components: { GameItem },
  props: ['games'],
  data() {
    return {}
  },
  computed: {
    sortedGames: function() {
      return this.games.sort((a, b) => new Date(a.schedule) - new Date(b.schedule))
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped>
</style>

