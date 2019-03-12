<template>
    <div class="game-item">
        <p>{{game.team1}} - {{game.team2}}</p>
    </div>
</template>

<script>
export default {
    name: "GameItem",
    props: ["game"]
}
</script>

<style scoped>
    .game-item {
        background: #223344;
        color: bisque;
        padding: 10px;
        border-bottom: 5px #ccc dotted;
        margin: auto;
        text-align: center;
        width: 60%;
    }
</style>