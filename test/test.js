const request = require("supertest");
const assert = require("assert");
const app = require("../app");
const mongoose = require('mongoose');
const config = require("../config")[process.env.NODE_ENV || 'test'];
const routes = require('../routes/routes.js');
const items = require('../models/items.js')


before("connect to Mongo", function (done) {


  mongoose.connect(config.mongoURL)
  items.create({
    status: 'success',
    data: [
      {
        id: 1,
        description: 'twix',
        cost: 85,
        quantity: 10,
        money_given: 85,
        money_required: 85
      }
    ]
  },

  {
    status: 'fail',
    data: [
      {
        id: 2,
        description: 'snickers',
        cost: 95,
        quantity: 7,
        money_given: 85,
        money_required: 95
      }
    ]
  })

  .then(function(){
    done()
  })
});

after("drop database", function (done) {
  mongoose.connection.dropDatabase(done);
});

describe("GET /api/customer/items", function(){
  it('should return successfully', function(done){
    request(app)
    .get('/api/customer/items')
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(function(res){
      // let items = res.body;
      assert(res)
      assert.equal(res.body[0].data[0].description, 'twix')
      assert.equal(res.body[1].data[0].description, 'snickers')
      console.log(res.body[0].data[0]);
    })
    .end(done);
  });
});

describe('GET /api/vendor/purchases', function(){
  it('should return purchased items', function(done){
    request(app)
    .get('/api/vendor/purchases')
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(function(res){
      assert(res)
      assert.equal(res.body.length, 1)
      assert.equal(res.body[0].status, 'success')
      console.log(res.body);
    })
    .end(done);
  })
})

// describe("POST /api/customer/items/:itemId/purchases", function(){
//   it('should post successfully', function(done){
//     request(app)
//     .post('/api/customer/items/:itemId/purchases')
//     .expect(200)
//     .expect("Content-Type", "application/json; charset=utf-8")
//     .expect(function(res){
//       assert(req)
//     })
//   })
// })
