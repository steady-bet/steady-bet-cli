<template>
  <div class="game-item">
    <div class="left">
      <div>
        <strong>{{game.team1}}</strong>
      </div>
      <div class="rate-left">33%</div>
    </div>
    <div class="middle">
      <div>VS</div>
      <div class="rate-middle">17%</div>
    </div>
    <div class="right">
      <strong>{{game.team2}}</strong>
      <div class="rate-right">50%</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameItem",
  props: ["game"]
};
</script>

<style scoped>
.game-item {
  display: table;
  height: 100px;
  margin: 20px auto;
  border: 1px dotted;
  border-radius: 30px;
}
.game-item > div {
  display: table-cell;
}
.left,
.right {
  width: 50%;
  padding: 0 60px;
  vertical-align: middle;
}
.left {
  text-align: right;
}
.middle {
  vertical-align: middle;
}
.right {
  text-align: left;
}
.rate-left {
  background: #abe;
  width: 90px;
  height: 40px;
  margin-left: auto;
  margin-right: 0px;
  text-align: center;
  line-height: 40px;
  border: 0px;
  border-radius: 8px;
}
.rate-right {
  background: #abe;
  width: 90px;
  height: 40px;
  margin-left: 0px;
  margin-right: auto;
  text-align: center;
  line-height: 40px;
  border: 0px;
  border-radius: 8px;
}
.rate-middle {
  background: #abe;
  width: 90px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: 0px;
  border-radius: 8px;
}
.rate-left:hover {
    opacity: 0.6;
}
.rate-middle:hover {
    opacity: 0.6;
}
.rate-right:hover {
    opacity: 0.6;
}
</style>