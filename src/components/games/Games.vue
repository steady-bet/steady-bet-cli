<template>
  <div>
    <div v-bind:key="game.id" v-for="game in games">
      <GameItem v-bind:game="game"/>
    </div>
  </div>
</template>

<script>
import GameItem from "@/components/games/GameItem.vue";

export default {
  name: "games",
  components: { GameItem },
  props: ["games"],
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
</style>

