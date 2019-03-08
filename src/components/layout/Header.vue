<template>
    <div class="header">
        <div class="col-container">
            <div class="column1">
            SteadyBet
            </div>
            <div class="column2">
            <router-link to="/">Homeland</router-link> | 
            <router-link to="/about">About</router-link>
            </div>
            <div class="column3">
                wallet : {{walletInfo.publicKey}}<br>
                balance : {{walletInfo.balance}} <br>
                last trx id : {{walletInfo.lastTrxId}}
            </div>
        </div>

      
    </div>

</template>

<script>
import axios from 'axios'
export default {
    name: 'Header',
    data (){
        return{
            walletInfo: {
                publicKey: "Osxa" 
            }
        }
    },
    created(){
        axios.get('http://localhost:8383/wallet/3r57ycZuw5L2AHmNc7Tz4fnSDgJu9nv2Cc5cjmEprTUi')
            .then(res => this.walletInfo = res.data)
            .catch(e => console.log(e));
    }
}
</script>

<style scoped>
.col-container {
    display: table; 
    width: 100%;
}
.column1 {
    display: table-cell;
    width: 10%
}
.column2 {
    display: table-cell;
    width: 40%
}
.column3 {
    display: table-cell;
    text-align: left;
}
</style>
