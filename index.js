const bodyParser = require('body-parser')
const express = require('express')
const db = require('./config/db')
const MenuItems = require('./models/MenuItems')
const data = require('./data.json')
const menuItemsRouters = require('./routes/menu-items')

const app = express()
const PORT = process.env.PORT || 4001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

db.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(() => console.error('Unable to connect to the database:', error))

// force: true to be removed or alternative to primaryKey bug to be found
db.sync()
  .then(() => {
    console.log('Database synced')

    MenuItems.findAll().then(items => {
      if (!items.length) {
        MenuItems.bulkCreate(data.items, { validate: true })
      }
    })
  })

  .catch(err => console.log(err))

app.listen(PORT, () => console.log(`Express API listening on port ${PORT}`))

app.use('/menu-items', menuItemsRouters)
