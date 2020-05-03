const express = require('express')
const MenuCategories = require('../models/MenuCategories')
const db = require('../config/db')

const router = express.Router()

router.get('/', (req, res) => {
  MenuCategories.findAll(
    // {
    //   attributes: ['id', 'name', 'price']
    // }
  )
    .then(items => res.send({ items }))
    .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
  const itemId = req.params.id

  MenuCategories.findOne({
    where: {
      id: itemId
    }
  })
    .then(item => res.send({ item }))
    .catch(err => console.log(err))
})

router.post('/add', (req, res) => {
  const item = req.body

  MenuCategories.create(item)
    .then(item => res.status(201).send(item))
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const itemId = req.params.id
  const updates = req.body

  // find the user in the DB
  MenuCategories.findOne({ itemId })
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

  MenuCategories.findOne({ itemId })
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