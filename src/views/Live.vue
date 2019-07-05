<template>
  <div class="live">

      <div>
        <b>live events</b>
          <GamesLive v-bind:games="games"/>
      </div>
  </div>
</template>

<script>

import axios from "axios";
import GamesLive from "@/components/games/live/GamesLive.vue";
export default {
  name: "live",
  components: {
    GamesLive
  },
  data() {
    return {
      games: []
    };
  },
  methods: {
    getLiveMatchs(){
        axios
          .get("http://localhost:8383/matches/live/getAll")
          .then(res => (this.games = res.data))
          .catch(e => console.log(e));
    }
  },
    mounted() {
      this.getLiveMatchs();
  }
};
</script>

<style scoped>
.live {
  background: #111;
  color: yellow;
}

</style>
