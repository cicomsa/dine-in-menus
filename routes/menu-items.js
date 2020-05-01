const express = require('express')
const MenuItems = require('../models/MenuItems')
const db = require('../config/db')

const router = express.Router()

router.get('/', (req, res) => {
  MenuItems.findAll(
    // {
    //   attributes: ['id', 'name', 'price']
    // }
  )
    .then(items => res.send({ items }))
    .catch(err => console.log(err))
    .finally(() => db.close())
})

router.get('/:id', (req, res) => {
  const itemId = req.params.id
  MenuItems.findOne({ itemId })
    .then(item => res.send({ item }))
    .catch(err => console.log(err))
    .finally(() => db.close())
})

router.post('/add', (req, res) => {
  const item = req.body

  MenuItems.create(item)
    .then(item => res.status(201).send(item))
    .catch(err => console.log(err))
    .finally(() => db.close())
})

router.put('/:id', (req, res) => {
  const itemId = req.params.id
  const updates = req.body

  // find the user in the DB
  MenuItems.findOne({ itemId })
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
    .finally(() => db.close())
})

router.delete('/:id', (req, res) => {
  const itemId = req.params.id

  MenuItems.findOne({ itemId })
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
    .finally(() => db.close())
})

module.exports = router