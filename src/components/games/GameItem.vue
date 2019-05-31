<template>
  <div class="game-item">
    <p>{{ game.schedule | moment(false, "MM-DD-YYYYTHH:mm:ss").format("LLLL") }}</p>
    <!--<p>{{ game.schedule | moment(false, "MM-DD-YYYYTHH:mm:ss").utc() }}</p>-->
    <div class="item-table">
      <div>
        <img class="crest crest-left" v-bind:src="game.crestUrlTeam1">
      </div>
      <div class="left" @click="showModal0">
        <div>
          <strong>{{game.team1}}</strong>
        </div>
        <div class="rate-left">{{matchBets.homeRate ? matchBets.homeRate.toFixed(2)+'%' : '?'}}</div>
      </div>
      <div class="middle" @click="showModal1">
        <div>DRAW</div>
        <div class="rate-middle">{{matchBets.drawRate ? matchBets.drawRate.toFixed(2)+'%' : '?'}}</div>
      </div>
      <div class="right" @click="showModal2">
        <strong>{{game.team2}}</strong>
        <div class="rate-right">{{matchBets.awayRate ? matchBets.awayRate.toFixed(2)+'%' : '?'}}</div>
      </div>
      <div>
        <img class="crest crest-right" v-bind:src="game.crestUrlTeam2">
      </div>
    </div>
    <a class="linkSM" v-bind:href="linkToSmart">{{game.smartContract}}</a>
    <confirmBetModal v-bind:selectedBet="selectedBet" v-show="isModalVisible" @close="closeModal"/>
  </div>
</template>

<script>
import confirmBetModal from "./ConfirmBetModal.vue";
import axios from "axios";
export default {
  name: "GameItem",
  props: ["game"],
  components: {
    confirmBetModal
  },
  data() {
    return {
      isModalVisible: false,
      selectedBet: {
        team: -1,
        teamName: "",
        smartContract: "",
        interval: null
      },
      matchBets: []
    };
  },
  methods: {
    showModal() {
      this.selectedBet.smartContract = this.game.smartContract;
      this.isModalVisible = true;
    },
    showModal0() {
      this.selectedBet.team = 0;
      this.selectedBet.teamName = this.game.team1;
      this.showModal();
    },
    showModal1() {
      this.selectedBet.team = 1;
      this.selectedBet.teamName = "a draw";
      this.showModal();
    },
    showModal2() {
      this.selectedBet.team = 2;
      this.selectedBet.teamName = this.game.team2;
      this.showModal();
    },
    closeModal() {
      this.isModalVisible = false;
    },
    loadBets() {
      axios
        .get(
          "http://localhost:8383/matches/getBetsOnScheduleMatch/" +
            this.game.smartContract
        )
        .then(res => {
          this.matchBets = res.data;
          console.log(this.matchBets.totalHome);
        })
        .catch(e => console.log(e));
    }
  },
  computed: {
    linkToSmart() {
      return (
        "https://monitor.credits.com/testnet-r4_2/Contract/" +
        this.game.smartContract
      );
    }
  },
  mounted() {
    this.loadBets();
    this.interval = setInterval(
      function() {
        this.loadBets();
      }.bind(this),
      20000
    );
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>







<style scoped>
.game-item {
  height: 180px;
  margin: 20px auto;
  border: 1px dotted;
  border-radius: 30px;
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
.linkSM {
  font-size: small;
}
</style>