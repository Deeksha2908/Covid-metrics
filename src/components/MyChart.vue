<template>
  <div class="chart">
    <div :id="data.divID"></div>
    <div>
        <v-btn>Modify</v-btn>
        <v-btn @click="$emit('remove')">Delete</v-btn>
    </div>
  </div>
</template>

<script>
import c3 from "c3";
export default {
  name: "MyChart",
  props: {
    data: Object
  },
  data(){
    return{
      divId: `#${this.data.divID}`
    }
  },
  mounted() {
    const data = {
      columns: [
        this.data.yLabel
      ],
      type: this.data.type
    };
    const config = {
      bindto: this.divId,
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