const Sequelize = require('sequelize')
const db = require('../config/db')

const MenuItems = db.define('menu_items', {
  // id will automatically be created by sequelize
  name: Sequelize.STRING,
  price: Sequelize.DOUBLE,
  description: Sequelize.STRING,
  dietary: Sequelize.STRING,
  ingredients: Sequelize.STRING,
  additional_details: Sequelize.STRING,
  category: Sequelize.STRING,
  category_id: Sequelize.INTEGER
}, {
    tableName: 'menu_items',
    timestamps: false
  }
)

module.exports = MenuItems