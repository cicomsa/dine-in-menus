const Sequelize = require('sequelize')
const db = require('../config/db')

const Orders = db.define('orders', {
  // id will automatically be created by sequelize
  number: Sequelize.INTEGER,
  table: Sequelize.INTEGER,
  total_price: Sequelize.DOUBLE,
  payment: Sequelize.STRING
}, {
    tableName: 'orders',
    timestamps: true
  }
)

module.exports = Orders