const nock = require('nock');
const request = require('supertest')("http://localhost:4001");
const { expect } = require('chai');

const host = 'http://localhost:4001'

// todo - deep equal - double check returned real data

describe('Menu items REST API', () => {
  it('GET /menu-items/1 returns 200 OK', done => {
    //specify the url to be intercepted
    nock(host)
      //define the method to be intercepted
      .get('/menu-items/1')
      //respond with a OK and the specified JSON response
      .reply(200, {
        "status": 200,
        "message": "This is a mocked response"
      });

    //perform the request to the api which will now be intercepted by nock
    request
      .get('/menu-items/1')
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal("This is a mocked response");
        done();
      });
  })
})

describe('Menu items REST API', () => {
  it('GET /menu-items/29 returns item object', done => {
    nock(host)
      //define the method to be intercepted
      .get('/menu-items/29')
      //respond with a OK and the specified JSON response
      .reply(200, {
        "status": 200,
        "message": "This is a mocked response",
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
      });

    request
      .get('/menu-items/29')
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.body.item).to.deep.equal({
          id: 29,
          name: 'PICCANTE',
          price: 11.55,
          description: 'spicy Italian sausage, marinated tomatoes, olives, fresh herbs, tomato sauce, mozzarella',
          category: 'PIZZA',
          dietary: null,
          ingredients: 'spicy Italian sausage, marinated tomatoes, olives, fresh herbs, tomato sauce, mozzarella',
          additional_details: null
        })
        done();
      });
  })
})

describe('Menu items REST API', () => {
  it('GET /menu-items returns 200 OK', done => {
    //specify the url to be intercepted
    nock(host)
      //define the method to be intercepted
      .get('/menu-items')
      //respond with a OK and the specified JSON response
      .reply(200, {
        "status": 200,
        "message": "This is a mocked response"
      });

    //perform the request to the api which will now be intercepted by nock
    request
      .get('/menu-items')
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal("This is a mocked response");
        done();
      });
  })
})

describe('Menu items REST API', () => {
  it('GET /menu-items returns an envelope', done => {
    //specify the url to be intercepted
    nock(host)
      //define the method to be intercepted
      .get('/menu-items/1')
      //respond with a OK and the specified JSON response
      .reply(200, {
        "status": 200,
        "message": "This is a mocked response",
        "items": {}
      });

    //perform the request to the api which will now be intercepted by nock
    request
      .get('/menu-items/1')
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal("This is a mocked response");
        expect(res.body).to.have.property('items')
        done();
      });
  })
})

describe('Menu items REST API', () => {
  it('GET returns null for /menu-items/16700', done => {
    //specify the url to be intercepted
    nock(host)
      //define the method to be intercepted
      .get('/menu-items/1670')
      //respond with a OK and the specified JSON response
      .reply(200, {
        "status": 200,
        "message": "This is a mocked response",
        "item": null
      });

    //perform the request to the api which will now be intercepted by nock
    request
      .get('/menu-items/1670')
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal("This is a mocked response");
        expect(res.body.item).to.deep.equal(null)
        done();
      });
  })
})

describe('Menu items REST API', () => {
  it('POST returns 201 for /menu-items/add', done => {
    const body = {
      name: 'Item',
      price: 2.55
    }
    //specify the url to be intercepted
    nock(host)
      //define the method to be intercepted
      .post('/menu-items/add')
      //respond with a OK and the specified JSON response
      .reply(200, {
        "status": 201,
        "message": "This is a mocked response",
      });

    //perform the request to the api which will now be intercepted by nock
    request
      .post('/menu-items/add', body)
      .end(function (err, res) {
        console.log(err)
        //assert that the mocked response is returned
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal("This is a mocked response");
        done();
      });
  })
})

describe('Menu items REST API', () => {
  it('DELETE returns success meesage for /menu-items/1', done => {

    //specify the url to be intercepted
    nock(host)
      //define the method to be intercepted
      .delete('/menu-items/1')
      //respond with a OK and the specified JSON response
      .reply(200, {
        "status": 200,
        "message": "The item was deleted succesfully",
      });

    //perform the request to the api which will now be intercepted by nock
    request
      .delete('/menu-items/1')
      .end(function (err, res) {
        console.log(err)
        //assert that the mocked response is returned

        expect(res.body.message).to.equal('The item was deleted succesfully')
        done();
      });
  })
})
