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
      <v-btn v-if="isNew===true" variant="outlined" class="btn" @click="addNewChart">Create Chart</v-btn>
      <v-btn v-if="isNew===false" variant="outlined" class="btn" @click="ModifyChart">Modify Chart</v-btn>
      <v-btn v-if="isNew===false" variant="outlined" class="btn" @click="addNewChart">Save as new Chart</v-btn>
    </div>
    <MyChart v-if="yLabel.length>0"
      class="chart"
      :yLabel="yLabel"
      :type="chartType" 
      @remove="deleteChart">
    </MyChart>
  </div>
</template>
<script>
import axios from "axios";
import { state } from "../assets/states";
import MyChart from "./MyChart.vue";
import firebase from "firebase";
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
      chartType: "",
      data: null,
      chartid: null,
      isNew: null
    };
  },
  created() {
    
    if(this.$route.params.id != '-1'){
    this.data= JSON.parse(decodeURIComponent(this.$route.params.id));
      this.yLabel = Array.from(Object.values(this.data.ylabel));
      this.chartType = this.data.charttype;
      this.chartid= this.data.chartid;
      this.isNew= false;
    }
    else this.isNew= true;
    
  },
  methods: {
    async getData() {
      //this.display = 2;
      const url = "https://api.rootnet.in/covid19-in/stats/history";
      let result = await axios.get(url);
      let dateWiseFilteredData = result.data.data.filter(item => {
        return item.day >= this.startDate && item.day <= this.endDate;
      });
      this.xLabel = dateWiseFilteredData.map(item => {
        return item.day;
      });
      this.xLabel.unshift("x");
      this.yLabel = dateWiseFilteredData.map(item => {
        return item.regional.reduce(this.getDatewiseTotal, 0);
      });
      //this.yLabel.unshift("data1");
      console.log("yvalue",this.yLabel)
      //this.display = 3;
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
  
      await axios.post("http://localhost:3000/",{
        username: firebase.auth().currentUser.displayName,
        useremail: firebase.auth().currentUser.email,
        ylabel : this.yLabel,
        charttype: this.chartType
      }
        ).then(resp => {
        console.log(resp.data)
        this.chartid= resp.data;
        this.isNew= false;
        alert(`created a new chart with chart id ${this.chartid}`)
    })
    },
    async ModifyChart() {
        await this.getData();
        await axios.put(`http://localhost:3000/${this.chartid}`,{
        ylabel : this.yLabel,
        charttype: this.chartType 
      }).then(() => {
        console.log("modified")
        alert('modified chart')
    })
    },
    async deleteChart()
    {
      this.yLabel= [],
      this.chartType= ''
       await axios.delete(`http://localhost:3000/${this.chartid}`).then(resp => {
        console.log(resp.data)
    }).catch(() => console.log("error"))
      
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
.chart {
  margin: 100px;
}
.btn {
  margin: 0 auto;
}
</style>