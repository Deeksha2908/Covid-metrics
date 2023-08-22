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
app.get('/', db.getAllChartsByUser)
app.post('/', db.postNewChart)
app.put('/:id', db.updateChart)
app.delete('/:id', db.deleteChart)

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server listenig on port ${PORT}`)
})