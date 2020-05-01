const Sequelize = require('sequelize')
const connectionString = require('../secrets')
const db = new Sequelize(connectionString)

module.exports = db