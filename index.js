const bodyParser = require('body-parser')
const express = require('express')
const db = require('./config/db')
const data = require('./data.json')
const MenuItems = require('./models/MenuItems')
const MenuCategories = require('./models/MenuCategories')
const menuItemsRouters = require('./routes/menu-items')
const menuCategoriesRouters = require('./routes/menu-categories')
const orderedItemRouters = require('./routes/ordered-item')
const ordersRouters = require('./routes/orders')
const { addStaticData } = require('./helpers')

const app = express()
const PORT = process.env.PORT || 4001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})

db.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(() => console.error('Unable to connect to the database:', error))

// force: true to be removed or alternative to primaryKey bug to be found
db.sync()
  .then(() => {
    console.log('Database synced')

    addStaticData(MenuItems, data.items)
    addStaticData(MenuCategories, data.categories)
  })
  .catch(err => console.log(err))

app.listen(PORT, () => console.log(`Express API listening on port ${PORT}`))

app.use('/menu-items', menuItemsRouters)
app.use('/menu-categories', menuCategoriesRouters)
app.use('/ordered-item', orderedItemRouters)
app.use('/orders', ordersRouters)
