<template>
  <div class="flex-container">
    <ChartCart v-for="chart in ChartList" :key="chart.id" :data="chart"></ChartCart>
  </div>
</template>

<script>
import ChartCart from '@/components/ChartCart.vue';
//import axios from 'axios'
export default {
    name:'ThumbnailView',
    components:{
       ChartCart
    },
    data(){
       return{
        itemCount: 5,
        ChartList:[]
       }
    },
    async mounted(){
        const pathname= window.location.pathname
        const lastIndex= pathname.lastIndexOf('/');
        const username= pathname.slice(lastIndex + 1);
       console.log(username)

       /* await axios.get("http://localhost:3000/").then(resp => {

console.log(resp.data);
});*/

        this.ChartList= [
            {
                id: 1,
                yLabel:['data1', 10, 20 , 30 , 40 ,50],
                type: 'line'
            },
            {
                id:2,
                yLabel:['data1', 20, 30 , 10 , 240 ,50],
                type: 'bar'
            },
            {
                id:3,
                yLabel:['data1', 56, 23 , 45 , 40 ,50],
                type: 'step'
            },
            {
                id:4,
                yLabel:['data1', 5, 60 , 30 , 47 ,50],
                type: 'line'
            },
            {
                id:5,
                yLabel:['data1', 63, 72 , 36 , 27 ,50],
                type: 'bar'
            }

        ]

    }
}
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap;
}
</style>