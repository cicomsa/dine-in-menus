const Sequelize = require('sequelize')
const db = require('../config/db')

const MenuCategories = db.define('menu_categories', {
  // id will automatically be created by sequelize
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  additional_details: Sequelize.STRING
}, {
    tableName: 'menu_categories',
    timestamps: false
  }
)

module.exports = MenuCategories