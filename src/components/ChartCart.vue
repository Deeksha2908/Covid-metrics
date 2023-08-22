<template>
  <div  class="card">
  <v-card
    max-width="400"
  >
  <v-img v-if="addnew===true"
      class="white--text align-end"
      height="200px"
      src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg"
    >
  </v-img>
    <v-img v-else-if="data.charttype=='line'"
      class="white--text align-end"
      height="200px"
      src="https://www.tutorialspoint.com/advanced_excel_charts/images/same_data_as_line_chart.jpg"
    >
  </v-img>
  <v-img v-else-if="data.charttype=='bar'"
      class="white--text align-end"
      height="200px"
      src="https://datavizproject.com/wp-content/uploads/types/Bar-Chart-Vertical.png"
    >
  </v-img>
  <v-img v-else-if="data.charttype=='step'"
      class="white--text align-end"
      height="200px"
      src="https://www.tutorialspoint.com/advanced_excel_charts/images/step_chart.jpg"
    >
  </v-img>
 
      <v-card-title v-if="addnew===false">Chart {{ index +1 }} </v-card-title>


    <v-card-actions>
      <v-btn v-if="addnew ===false"
        color="orange" 
        text
      >
      <router-link :to="{name : 'card', params : {id : encodeURIComponent(JSON.stringify(data))}}" >Go to Chart</router-link>
      </v-btn>
      <v-btn v-else text>
        <router-link :to="{name : 'card', params : {id : '-1'}}" > Create Chart</router-link>
      </v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
export default {
    name:'ChartCard',
    props:{
      data: Object,
      addnew: Boolean,
      index: Number
    },
    mounted(){
      console.log(this.data.charttype)
    }
   

}
</script>
<style scoped>
.card{
  margin: 20px;
}
</style>