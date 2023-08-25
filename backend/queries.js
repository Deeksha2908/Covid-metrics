const { response } = require('express')

//const configdata= require('./dbconfig.json')
const Pool = require('pg').Pool


const getAllChartsByUser= (req, res)=>{
  const email = req.params.id;
  
    pool.query('SELECT * FROM chartusers WHERE useremail = $1',[email], (error, results) => {
        if (error) {
          console.log("error")
          throw error
        }
        else {
          
          res.send(results.rows);
          console.log("success")
        }
      })
}

const postNewChart = (req, res) =>{
  const { username, useremail,  ylabel, charttype } = req.body
  //console.log(req.body)
  const query = {
    text: 'INSERT INTO chartusers(username, useremail,ylabel, charttype) VALUES($1, $2, $3, $4) RETURNING *',
    values: [username, useremail, ylabel, charttype],

  }
    pool.query(query,(error, results) => {
        if (error) {
          console.log("error")
        }
        else{
          console.log(results.rows[0].chartid)
          res.send(`${results.rows[0].chartid}`)
        }
        
      })
   
}

const updateChart= (req, res) =>{
    const id = req.params.id
  const { ylabel, charttype } = req.body

  pool.query(
    'UPDATE chartusers SET  ylabel = $1, charttype= $2 WHERE chartid = $3',
    [ ylabel,charttype, id],
    (error, results) => {
      if (error) {
        throw error
      }
      console.log("edited")
      res.status(200).send("edited")
    }
  )

}

const deleteChart= (req, res) => {
  const id =req.params.id
  console.log(id)
  pool.query('DELETE FROM chartusers WHERE chartid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`chart deleted with ID: ${id}`)
    console.log("deleted")
  })

}


module.exports= {
    getAllChartsByUser,
    postNewChart,
    updateChart,
    deleteChart
}