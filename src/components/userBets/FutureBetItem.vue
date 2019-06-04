<template>
  <div class="bet-item">
    {{ betItem.pk.matchDate | moment(false, "MM-DD-YYYYTHH:mm:ss").format("L") }} {{betItem.matchName}} 
    <br>
    <strong>{{betItem.betName}} {{betItem.betAmount}} </strong>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "futureBetItem",
  props: ["betItem"],
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
  },
  mounted() {
  },
  beforeDestroy() {

  }
};
</script>




<style scoped>
.bet-item {
  margin: 20px auto;
  border-radius: 30px;
}

</style>