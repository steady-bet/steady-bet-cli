<template>
  <div class="game-item">
    <p>{{ game.schedule | moment(false, "MM-DD-YYYYTHH:mm:ss").format("LLLL") }}</p>
    <!--<p>{{ game.schedule | moment(false, "MM-DD-YYYYTHH:mm:ss").utc() }}</p>-->
    <div class="item-table">
      <div>
        <img class="crest crest-left" v-bind:src="game.crestUrlTeam1">
      </div>
      <div class="left">
        <div>
          <strong>{{game.team1}}</strong>
        </div>
        <div class="rate-left">{{game.team1Goals}}</div>
        <div class="rate-left">{{game.homeRate ? game.homeRate.toFixed(2)+'%' : '-'}}</div>
      </div>
      <div class="middle">
        <div>DRAW</div>
        <div class="score-middle"></div>
        <div class="rate-middle">{{game.drawRate ? game.drawRate.toFixed(2)+'%' : '-'}}</div>
      </div>
      <div class="right">
        <strong>{{game.team2}}</strong>
        <div class="rate-right">{{game.team2Goals}}</div>
        <div class="rate-right">{{game.awayRate ? game.awayRate.toFixed(2)+'%' : '-'}}</div>
      </div>
      <div>
        <img class="crest crest-right" v-bind:src="game.crestUrlTeam2">
      </div>
    </div>
    <a class="linkSM" v-bind:href="linkToSmart">{{game.smartContract}}</a>
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "GameItemLive",
  props: ["game"],
  components: {

  },
  data() {
    return {
      isModalVisible: false,
      selectedBet: {
        team: -1,
        teamName: "",
        smartContract: "",
        matchDate: null,
        matchName: null,
        interval: null
      },
      matchBets: []
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
.game-item {
  height: 180px;
  margin: 20px auto;
  border: 1px dotted;
  border-radius: 30px;
  color: black;
}
.item-table {
  display: table;
}
.item-table > div {
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
.crest-left {
  float: left;
  margin-left: 60px;
}
.crest-right {
  float: right;
  margin-right: 60px;
}
.crest {
  margin-top: 20px;
  height: 60px;
  width: 60px;
  border: 0;
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
.score-middle {
  width: 90px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: 0px;
  border-radius: 8px;
}
.linkSM {
  font-size: small;
}
</style>