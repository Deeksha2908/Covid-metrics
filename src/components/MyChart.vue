<template>
  <div class="chart">
    <div id="chart"></div>
    <div>
        <v-btn @click="$emit('remove')">Delete</v-btn>
    </div>
  </div>
</template>

<script>
import c3 from "c3";
export default {
  name: "MyChart",
  props: {
    yLabel: Array,
    type: String
  },
  
  mounted() {
    //const yAxisData= this.data.yLabel;
    //yAxisData.unshift('data1')
    //console.log(this.data.yLabel)
    const data = {
      columns: [
        this.yLabel
      ],
      type: this.type
    };
    const config = {
      bindto: "#chart",
      data: data
    };
    this.chart= c3.generate(config);
  }
};
</script>

<style scoped>
.chart{
  margin-left: 250px;
  margin-right: 250px;
}
</style>