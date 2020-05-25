<template>
  <div class="home">
    <div class="col-container">
      <div class="column1">
        <MenuItems @nodeSelected="(id,hasChildren)=>selectNode(id, hasChildren)"/>
      </div>
      <div class="column2">
        <Games v-bind:games="games"/>
      </div>
      <div class="column3">
        <FutureBetsSummary v-bind:myFutureBets="myFutureBets"/>
      </div>
    </div>
    <p class="testHalfHiden">&nbsp;</p>
  </div>
</template>

<script>
// @ is an alias to /src
import MenuItems from '@/components/MenuItems/MenuItems.vue'
import Games from '@/components/games/Games.vue'
import FutureBetsSummary from '@/components/userBets/FutureBetsSummary.vue'
import { restHttp } from '@/_services/axios.service'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    MenuItems,
    Games,
    FutureBetsSummary
  },
  data () {
    return {
      games: [],
      myFutureBets: []
    }
  },
  methods: {
    ...mapActions('userFutureBets', ['loadBets']),
    ...mapGetters('userFutureBets', ['userFutureBetsOrderedDateDesc']),
    selectNode (id, hasChildren) {
      console.debug(`parent say id is : ${id} and hasChildren = ${hasChildren}`)
      if (!hasChildren) {
        restHttp
          .get(`matches/scheduled/${id}`)
          .then(res => (this.games = res.data))
          .catch(e => console.log(e))
      }
    }
  },
  created () {
    // if user is already connected load future bets when page is opened
    var user = JSON.parse(localStorage.getItem('user'))
    if (user && user.wallet && localStorage.getItem('access_token')) {
      this.loadBets(user.wallet)
      this.myFutureBets = this.userFutureBetsOrderedDateDesc
    }
  }
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
