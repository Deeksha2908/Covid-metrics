<template>
  <div  class="card">
  <v-card
    max-width="400"
  >
    <v-img v-if="data.type=='line'"
      class="white--text align-end"
      height="200px"
      src="https://www.tutorialspoint.com/advanced_excel_charts/images/same_data_as_line_chart.jpg"
    >
  </v-img>
  <v-img v-else-if="data.type=='bar'"
      class="white--text align-end"
      height="200px"
      src="https://datavizproject.com/wp-content/uploads/types/Bar-Chart-Vertical.png"
    >
  </v-img>
  <v-img v-else
      class="white--text align-end"
      height="200px"
      src="https://www.tutorialspoint.com/advanced_excel_charts/images/step_chart.jpg"
    >
  </v-img>
      <v-card-title>Chart {{ data.id }} </v-card-title>


    <v-card-actions>
      <v-btn
        color="orange" 
        text
      >
      <router-link :to="{name : 'card', params : {id : encodeURIComponent(JSON.stringify(data))}}" >Go to Chart</router-link>
      </v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
export default {
    name:'ChartCard',
    props:{
      data: Object
    }
   

}
</script>
<style scoped>
.card{
  margin: 20px;
}
</style>