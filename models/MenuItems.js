const Sequelize = require('sequelize')
const db = require('../config/db')

const MenuItems = db.define('menu_items', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  price: Sequelize.DOUBLE,
  description: Sequelize.STRING,
  category: Sequelize.STRING,
  dietary: Sequelize.STRING,
  ingredients: Sequelize.STRING,
  additional_details: Sequelize.STRING
}, {
    tableName: 'menu_items',
    timestamps: false
  }
)

module.exports = MenuItems