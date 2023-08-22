//const configdata= require('./dbconfig.json')
const Pool = require('pg').Pool
const pool = new Pool({
  user: "deekshasinha",
  host: 'localhost',
  database: "deekshasinha",
  password: 'postpw298',
  port: 5432,
})

const getAllChartsByUser= ()=>{
    pool.query('SELECT * FROM chartusers', (error, results) => {
        if (error) {
          throw error
        }
        else console.log(results.rows)
      })
}

const postNewChart = () =>{
  const query = {
    text: 'INSERT INTO chartusers(username, useremail,xlabel,ylabel, charttype) VALUES($1, $2, $3, $4, $5)',
    values: ['brianc', 'brian.m.carlson@gmail.com', [23, 45], [56,24], 'line'],
  }
    pool.query(query, (error, results) => {
        if (error) {
          throw error
        }
        else console.log(results.rows)
      })
   
}

const updateChart= () =>{
    //const id = parseInt(request.params.id)
  //const { name, email } = request.body

  pool.query(
    'UPDATE chartusers SET username = $1, useremail = $2 WHERE chartid = $3',
    ['Deeksha', 'deeksha@gmail.com', 2],
    (error, results) => {
      if (error) {
        throw error
      }
      console.log("edited")
    }
  )

}

const deleteChart= () => {
    //const id = parseInt(request.params.id)

  pool.query('DELETE FROM chartusers WHERE chartid = $1', [1], (error, results) => {
    if (error) {
      throw error
    }
    //response.status(200).send(`User deleted with ID: ${id}`)
    console.log("deleted")
  })

}

module.exports= {
    getAllChartsByUser,
    postNewChart,
    updateChart,
    deleteChart
}