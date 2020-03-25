<template>
  <div class="home">
    <div class="col-container">
      <div class="column1">

      </div>
      <div class="column2">
        <div v-bind:key="game.id" v-for="game in sortedGames">
         <GameItem v-bind:game="game"/>
        </div>
      </div>
      <div class="column3">
       <FutureBetsSummary v-bind:myFutureBets="myFutureBets"/>
      </div>
    </div>

  </div>
</template>

<script>
import GameItem from '@/components/games/live/GameItemLive.vue'
import FutureBetsSummary from '@/components/userBets/FutureBetsSummary.vue'

export default {
  name: 'gamesLive',
  components: {
    GameItem,
    FutureBetsSummary
  },
  props: ['games'],
  data () {
    return {}
  },
  computed: {
    sortedGames: function () {
      return this.games.sort((a, b) => new Date(a.schedule) - new Date(b.schedule))
    }
  },
  created () {},
  methods: {}
}
</script>

<style scoped>
.home {
  background: #111;
}
.col-container {
  display: table; /* Make the container element behave like a table */
  width: 100%; /* Set full-width to expand the whole page */
  margin-left: auto;
  margin-right: auto;
}
.column1 {
  display: table-cell;
  width: 25%;
  background: #abe;
}
.column2 {
  display: table-cell;
  background: #bcf;
}
.column3 {
  display: table-cell;
  width: 25%;
  background: #abe;
}
.testHalfHiden {
  color: #555;
}
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
}
/* Create two equal columns that floats next to each other */
</style>
