const addStaticData = (Model, data) => {
  Model.findAll().then(items => {
    if (!items.length) {
      Model.bulkCreate(data, { validate: true })
    }
  })
}

module.exports = {
  addStaticData
}