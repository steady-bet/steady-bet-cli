<template>
    <div class="bet-item">
        <div class="bet-item">
            {{ bet.pk.matchDate | moment(false, "MM-DD-YYYYTHH:mm:ss").format("L") }} Match = {{bet.matchName}} 
            <br>
            <strong>Team={{bet.betName}} : {{bet.betAmount}} CS</strong>
        </div>
    </div>
    
</template>

<script>
import { restHttp } from '@/_services/axios.service'

/*
date du pari
date du match / heure / équipes
score du match si match fini
montant du pari
gain éventuels
solde de l'opération gain - montant du pari
*/
export default {
    name: 'betHistoryItem',
    props: ['bet'],
    data() {
        return {
        }
    }
}
</script>

<style scoped>

</style>