const express= require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
//db.postNewChart();
//db.updateChart()
//db.deleteChart();
db.getAllChartsByUser();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server listenig on port ${PORT}`)
})