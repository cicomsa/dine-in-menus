const Sequelize = require('sequelize')
const db = require('../config/db')

const OrderedItem = db.define('ordered_item', {
    // id will automatically be created by sequelize
    name: Sequelize.STRING,
    extras: Sequelize.STRING,
    without: Sequelize.STRING,
    addition_information: Sequelize.STRING,
    item_id: Sequelize.INTEGER,
    ordered_item_price: Sequelize.DOUBLE,
    order_number: Sequelize.INTEGER
}, {
        tableName: 'ordered_item',
        timestamps: true
    }
)

module.exports = OrderedItem