const express= require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
//db.postNewChart();
//db.updateChart()
//db.deleteChart();
//db.getAllChartsByUser();
const cors = require('cors')
app.use(cors())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
//db.getAllChartsByUser();
app.get('/:id', (req, res)=>{
  db.getAllChartsByUser(req, res)
})
app.post('/',(req, res)=>{
  db.postNewChart(req, res)
})
app.put('/:id', (req, res)=>{
  db.updateChart(req, res)
})
app.delete('/:id', (req, res)=>{
  db.deleteChart(req, res)
})

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server listenig on port ${PORT}`)
})