<template>
  <div>
    <div class="main-box">
      <div>
        <v-select label="Cities" :items="state" multiple variant="solo-filled" v-model="cities"></v-select>
      </div>
      <div>
        <v-select
          label="Type"
          :items="['No of active cases', 'No of deaths']"
          variant="solo-filled"
          v-model="type"
        ></v-select>
      </div>

      <div>
        <v-text-field label="Start Date" v-model="startDate" variant="outlined"></v-text-field>
      </div>
      <div>
        <v-text-field label="End Date" v-model="endDate" variant="outlined"></v-text-field>
      </div>
      <div>
        <v-text-field label="Chart Type" v-model="chartType" variant="outlined"></v-text-field>
      </div>
    </div>
    <div class="btn">
      <v-btn variant="outlined" class="btn" @click="addNewChart">Generate Chart</v-btn>
    </div>
    <MyChart class="chart" v-for="(chart,index) in Charts" :key="chart.id" :data="chart.data" @remove="Charts.splice(index,1)" ></MyChart>
  </div>
</template>
<script>
import axios from "axios";
import { state } from "../assets/states";
import MyChart from "./MyChart.vue";
export default {
  name: "FilterData",
  components: {
    MyChart
  },
  data() {
    return {
      state: state,
      cities: [],
      type: "",
      startDate: "",
      endDate: "",
      xLabel: [],
      yLabel: [],
      display: 1,
      Charts: [],
      chartType:"",
      id:0
    };
  },
  created(){
    const data=JSON.parse(decodeURIComponent(this.$route.params.id));
    this.yLabel= data.yLabel;
    this.chartType= data.type;
    this.id= this.id+1;
      this.Charts.push({
        id: this.id,
        data: {
          xLabel: this.xLabel,
          yLabel: this.yLabel,
          type: this.chartType,
          divID: `chart${this.id}`
        }
      });
  }
  ,
  methods: {
    async getData() {
      this.display = 2;
      const url = "https://api.rootnet.in/covid19-in/stats/history";
      let result = await axios.get(url);
      let dateWiseFilteredData = result.data.data.filter(item => {
        return item.day >= this.startDate && item.day <= this.endDate;
      });
      this.xLabel = dateWiseFilteredData.map(item => {
        return item.day;
      });
      this.xLabel.unshift("x");
      console.log("xvalue", this.xLabel);
      this.yLabel = dateWiseFilteredData.map(item => {
        return item.regional.reduce(this.getDatewiseTotal, 0);
      });
      this.yLabel.unshift("data1");
      //console.log("yvalue",this.yLabel)
      this.display = 3;
    },
    getDatewiseTotal(total, obj) {
      let add = 0;
      if (this.cities.includes(obj.loc)) {
        if (this.type === "No of active cases") add = obj.totalConfirmed;
        else add = obj.deaths;
      }
      return total + add;
    },
    async addNewChart() {
      await this.getData();
      this.id= this.id+1;
      this.Charts.push({
        id: this.id,
        data: {
          xLabel: this.xLabel,
          yLabel: this.yLabel,
          type: this.chartType,
          divID: `chart${this.id}`
        }
      });
    }
  }
};
</script>
<style scoped>
.main-box {
  display: flex;
  width: 100%;
}
.main-box > div {
  margin: 30px;
  padding: 5px;
  width: 100%;
  flex-grow: 1;
}
.chart{
  margin: 100px;
}
.btn{
  margin: 0 auto;
}
</style>