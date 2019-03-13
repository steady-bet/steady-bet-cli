<template>
  <div class="home">
    <div class="col-container">
      <div class="column1">
        <MenuItems @nodeSelected="(id)=>selectNode(id)"/>
      </div>
      <div class="column2">
        <Games v-bind:games="games"/>
      </div>
      <div class="column3">
        <h2>Column 3</h2>
        <p>Some text..</p>
      </div>
    </div>
    <p class="testHalfHiden">wallet test reminder : 3r57ycZuw5L2AHmNc7Tz4fnSDgJu9nv2Cc5cjmEprTUi</p>
  </div>
</template>

<script>
// @ is an alias to /src
import MenuItems from "@/components/MenuItems/MenuItems.vue";
import Games from "@/components/games/Games.vue";
import axios from "axios";
export default {
  name: "home",
  components: {
    MenuItems,
    Games
  },
  data() {
    return {
      games: []
    }
  },
  methods: {
    selectNode(id) {
      console.log("parent say id is :" + id);
      axios
        .get("http://localhost:8383/games/"+id)
        .then(res => (this.games = res.data))
        .catch(e => console.log(e));
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
  width: 80%; /* Set full-width to expand the whole page */
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
.testHalfHiden{
  color: #555
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
