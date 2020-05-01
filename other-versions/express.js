const express = require('express')
const { Client } = require('pg')
const connectionString = require('../secrets')

const app = express()
const PORT = process.env.PORT || 4001

app.listen(PORT, () => console.log(`Express API listening on port ${PORT}`))

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
//   next()
// })

const client = new Client({ connectionString })

client.connect()

app.get('/menu-items', (req, res) => {
  client.query('select * from menu_items', (error, result) => {
    if (error) {
      res.status(500).send({
        message: 'Something went wrong with Postgres!',
        details: error.message
      })
    } else {
      res.send({ items: result.rows })
    }

    client.end()
  })
})

app.get('/menu-items/:id', (req, resp) => {
  const itemId = req.params.id

  client.query('SELECT * FROM menu_items WHERE id = $1', [itemId], (error, result) => {
    if (error) {
      res.status(500).send({
        message: 'Something went wrong with Postgres!',
        details: error.message
      })
    } else if (result.rows[0]) {
      res.send(result.rows[0])
    } else {
      res.status(404).send({
        message: 'Item not found!'
      })
    }

    client.end()
  })
})
