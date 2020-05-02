const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = chai

chai.use(chaiHttp)

// to mock the requst api url
const host = 'http://localhost:4001'

describe('Menu items REST API', () => {
  it('GET /menu-items/1 returns 200 OK', done => {
    chai.request(host)
      .get('/menu-items/1')
      .end(function (err, res) {
        if (err) done(err)

        expect(res).to.have.status(200)
        done()
      })
  })

  it('GET /menu-items/29 returns item object', done => {
    chai.request(host)
      .get('/menu-items/29')
      .end(function (err, res) {
        if (err) done(err)

        const body = res.body
        console.log(body)
        expect(body).to.deep.equal({
          item: {
            id: 29,
            name: 'PICCANTE',
            price: 11.55,
            description: 'spicy Italian sausage, marinated tomatoes, olives, fresh herbs, tomato sauce, mozzarella',
            category: 'PIZZA',
            dietary: null,
            ingredients: 'spicy Italian sausage, marinated tomatoes, olives, fresh herbs, tomato sauce, mozzarella',
            additional_details: null
          }
        })
        done()
      })
  })

  it('GET /menu-items returns 200 OK', done => {
    chai.request(host)
      .get('/menu-items')
      .end(function (err, res) {
        if (err) done(err)

        expect(res).to.have.status(200)
        done()
      })
  })

  it('GET /menu-items returns an envelope', done => {
    chai.request(host)
      .get('/menu-items')
      .end(function (err, res) {
        if (err) done(err)

        const body = res.body
        expect(body).to.have.property('items')
        done()
      })
  })

  it('GET returns null for /menu-items/16700', done => {
    chai.request(host)
      .get('/menu-items/16700')
      .end(function (err, res) {
        if (err) done(err)

        const body = res.body
        expect(body).to.deep.equal({
          item: null
        })
        done()
      })
  })

  it('POST returns 201 for /menu-items/add', done => {
    const body = {
      name: 'Item',
      price: 2.55
    }
    chai.request(host)
      .post('/menu-items/add', body)
      .end(function (err, res) {
        if (err) done(err)

        expect(res).to.have.status(201)
        done()
      })
  })

  it('DELETE returns success meesage for /menu-items/1', done => {
    chai.request(host)
      .delete('/menu-items/1')
      .end(function (err, res) {
        if (err) done(err)

        expect(res.body.message).to.equal('The item was deleted succesfully')
        done()
      })
  })
})