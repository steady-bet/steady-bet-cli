<template>
    <div>
        <div/>
        <div>
            <strong>All my best bets...</strong>
        </div>
        <div v-bind:key="betItem.id" v-for="betItem in sortedBetItems">
            <BetHistoryItem v-bind:bet="betItem"/>
        </div> 
    </div>
</template>

<script>
import BetHistoryItem from './BetHistoryItem'

export default {
    name: 'betHistory',
    props: [ 'tabContent' ], // contains list of BetByUser beans
    components: { BetHistoryItem },
    data () {
        return {
        }
    },
    computed: {
        sortedBetItems: function () {
            // reverse order by match date
            return this.tabContent.sort( (a, b) => new Date(b.pk.matchDate) - new Date(a.pk.matchDate) )
        }
    },
    methods: {
        loadBets() {
            let user = localStorage.getItem('user')
            if(user && user.wallet) {
            // if (this.$store.getters['wallet/walletData'].address) {
                restHttp
                    .get(`bet/${user.wallet}/getAllUserBets`)
                    .then(res => {
                        this.tabContent = res.data
                        console.log(this.tabContent)
                    })
                    .catch(e => console.log(e))
            }
        }
    },
    mounted () {
        this.loadBets()
    }
    
}
</script>

<style scoped>

</style>
