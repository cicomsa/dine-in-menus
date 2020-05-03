const express = require('express')
const OrderedItem = require('../models/OrderedItem')
const db = require('../config/db')

const router = express.Router()

router.get('/', (req, res) => {
  OrderedItem.findAll(
    // {
    //   attributes: ['id', 'name', 'price']
    // }
  )
    .then(items => res.send({ items }))
    .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
  const itemId = req.params.id

  OrderedItem.findOne({
    where: {
      id: itemId
    }
  })
    .then(item => res.send({ item }))
    .catch(err => console.log(err))
})

router.post('/add', (req, res) => {
  const item = req.body

  OrderedItem.create(item)
    .then(item => res.status(201).send(item))
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const itemId = req.params.id
  const updates = req.body

  // find the user in the DB
  OrderedItem.findOne({ itemId })
    .then(name => {
      // change the item and store in DB
      return name.update(updates)
    })
    .then(item => {
      // respond with the changed name and status code 200 OK
      res.send(item)
    })
    .catch(error => {
      res.status(500).send({
        message: `Something went wrong`,
        error
      })
    })
})

router.delete('/:id', (req, res) => {
  const itemId = req.params.id

  OrderedItem.findOne({ itemId })
    .then(item => {
      // change the item and store in DB
      return item.destroy()
    })
    .then(() => {
      // respond with the changed name and status code 200 OK
      res.send({
        message: 'The item was deleted succesfully'
      })
    })
    .catch(error => {
      res.status(500).send({
        message: `Something went wrong`,
        error
      })
    })
})

module.exports = router